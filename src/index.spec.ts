import pathLib from 'node:path';

import { test } from '@playwright/test';
import endent from 'endent';
import expect from 'expect';
import fs from 'fs-extra';
import sharp from 'sharp';

import { toMatchImage } from '.';

expect.extend({ toMatchImage });

test('diffPath', async ({}, testInfo) => {
  const cwd = testInfo.outputPath();

  const img1 = await sharp({
    create: {
      background: { b: 0, g: 255, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  const img2 = await sharp({
    create: {
      background: { b: 255, g: 0, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  expect(img1).not.toMatchImage(img2, {
    diffPath: pathLib.join(cwd, 'diff.png'),
  });

  const diffBuffer = await fs.readFile(pathLib.join(cwd, 'diff.png'));

  expect(diffBuffer.toString('base64')).toEqual(
    'iVBORw0KGgoAAAANSUhEUgAAAJAAAAAwCAYAAAD+WvNWAAAAhklEQVR4Ae3BQQ0AIADEsHH+PYOIvUjWHi6Xj93D1w6Xn41EGIkwEmEkwkiEkQgjEUYijEQYiTASYSTCSISRCCMRRiKMRBiJMBJhJMJIhJEIIxFGIoxEGIkwEmEkwkiEkQgjEUYijEQYiTASYSTCSISRCCMRRiKMRBiJMBJhJMJIhJEIIxEebTUEXtVDAvcAAAAASUVORK5CYII=',
  );
});

test('different images', async () => {
  const img1 = await sharp({
    create: {
      background: { b: 0, g: 255, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  const img2 = await sharp({
    create: {
      background: { b: 255, g: 0, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  expect(() => expect(img1).toMatchImage(img2)).toThrow(
    'Expected the images to be equal, but they differ by 2304 pixels.',
  );
});

test('different images, and expecting to be different', async () => {
  const img1 = await sharp({
    create: {
      background: { b: 0, g: 255, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  const img2 = await sharp({
    create: {
      background: { b: 255, g: 0, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  expect(img1).not.toMatchImage(img2);
});

test('dumpDiffToConsole', async () => {
  const img1 = await sharp({
    create: {
      background: { b: 0, g: 255, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  const img2 = await sharp({
    create: {
      background: { b: 255, g: 0, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  expect(() => expect(img1).toMatchImage(img2, { dumpDiffToConsole: true }))
    .toThrow(endent`
      Expected the images to be equal, but they differ by 2304 pixels.

      data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAAwCAYAAAD+WvNWAAAAhklEQVR4Ae3BQQ0AIADEsHH+PYOIvUjWHi6Xj93D1w6Xn41EGIkwEmEkwkiEkQgjEUYijEQYiTASYSTCSISRCCMRRiKMRBiJMBJhJMJIhJEIIxFGIoxEGIkwEmEkwkiEkQgjEUYijEQYiTASYSTCSISRCCMRRiKMRBiJMBJhJMJIhJEIIxEebTUEXtVDAvcAAAAASUVORK5CYII=
    `);
});

test('equal images', async () => {
  const img = await sharp({
    create: {
      background: { b: 0, g: 255, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  expect(img).toMatchImage(img);
});

test('equal images, and expecting not to be equal', async () => {
  const img = await sharp({
    create: {
      background: { b: 0, g: 255, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  expect(() => expect(img).not.toMatchImage(img)).toThrow(
    'Expected the images to differ, but they are equal.',
  );
});

test('file', async ({}, testInfo) => {
  const cwd = testInfo.outputPath();

  const img1 = await sharp({
    create: {
      background: { b: 0, g: 255, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  const img2 = await sharp({
    create: {
      background: { b: 255, g: 0, r: 0 },
      channels: 3,
      height: 48,
      width: 48,
    },
  })
    .png()
    .toBuffer();

  await fs.outputFile(pathLib.join(cwd, 'img.png'), img2);

  expect(() => expect(img1).toMatchImage(pathLib.join(cwd, 'img.png'))).toThrow(
    'Expected the images to be equal, but they differ by 2304 pixels.',
  );
});
