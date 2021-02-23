import { endent } from '@dword-design/functions'
import { outputFile, readFile } from 'fs-extra'
import sharp from 'sharp'
import withLocalTmpDir from 'with-local-tmp-dir'

import { toMatchImage } from '.'

expect.extend({ toMatchImage })

export default {
  diffPath: () =>
    withLocalTmpDir(async () => {
      const img1 = await sharp({
        create: {
          background: { b: 0, g: 255, r: 0 },
          channels: 3,
          height: 48,
          width: 48,
        },
      })
        .png()
        .toBuffer()
      const img2 = await sharp({
        create: {
          background: { b: 255, g: 0, r: 0 },
          channels: 3,
          height: 48,
          width: 48,
        },
      })
        .png()
        .toBuffer()
      expect(img1).not.toMatchImage(img2, { diffPath: 'diff.png' })
      expect(await readFile('diff.png')).toMatchImage(
        await sharp({
          create: {
            background: { b: 0, g: 0, r: 255 },
            channels: 3,
            height: 48,
            width: 48,
          },
        })
          .png()
          .toBuffer()
      )
    }),
  'different images': async () => {
    const img1 = await sharp({
      create: {
        background: { b: 0, g: 255, r: 0 },
        channels: 3,
        height: 48,
        width: 48,
      },
    })
      .png()
      .toBuffer()
    const img2 = await sharp({
      create: {
        background: { b: 255, g: 0, r: 0 },
        channels: 3,
        height: 48,
        width: 48,
      },
    })
      .png()
      .toBuffer()
    let message
    try {
      expect(img1).toMatchImage(img2)
    } catch (error) {
      message = error.message
    }
    expect(message).toEqual(
      'Expected the images to be equal, but they differ by 2304 pixels.'
    )
  },
  'different images, and expecting to be different': async () => {
    const img1 = await sharp({
      create: {
        background: { b: 0, g: 255, r: 0 },
        channels: 3,
        height: 48,
        width: 48,
      },
    })
      .png()
      .toBuffer()
    const img2 = await sharp({
      create: {
        background: { b: 255, g: 0, r: 0 },
        channels: 3,
        height: 48,
        width: 48,
      },
    })
      .png()
      .toBuffer()
    expect(img1).not.toMatchImage(img2)
  },
  dumpDiffToConsole: () =>
    withLocalTmpDir(async () => {
      const img1 = await sharp({
        create: {
          background: { b: 0, g: 255, r: 0 },
          channels: 3,
          height: 48,
          width: 48,
        },
      })
        .png()
        .toBuffer()
      const img2 = await sharp({
        create: {
          background: { b: 255, g: 0, r: 0 },
          channels: 3,
          height: 48,
          width: 48,
        },
      })
        .png()
        .toBuffer()
      let message
      try {
        expect(img1).toMatchImage(img2, { dumpDiffToConsole: true })
      } catch (error) {
        message = error.message
      }
      expect(message).toMatch(endent`
        Expected the images to be equal, but they differ by 2304 pixels.

        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAX0lEQVR4AdXBAQEAAAiDMKR/55uD7QYjTOIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIkTuIeBHYCXtKRLlYAAAAASUVORK5CYII=
      `)
    }),
  'equal images': async () => {
    const img = await sharp({
      create: {
        background: { b: 0, g: 255, r: 0 },
        channels: 3,
        height: 48,
        width: 48,
      },
    })
      .png()
      .toBuffer()
    expect(img).toMatchImage(img)
  },
  'equal images, and expecting not to be equal': async () => {
    const img = await sharp({
      create: {
        background: { b: 0, g: 255, r: 0 },
        channels: 3,
        height: 48,
        width: 48,
      },
    })
      .png()
      .toBuffer()
    let message
    try {
      expect(img).not.toMatchImage(img)
    } catch (error) {
      message = error.message
    }
    expect(message).toEqual(
      'Expected the images to differ, but they are equal.'
    )
  },
  file: () =>
    withLocalTmpDir(async () => {
      const img1 = await sharp({
        create: {
          background: { b: 0, g: 255, r: 0 },
          channels: 3,
          height: 48,
          width: 48,
        },
      })
        .png()
        .toBuffer()
      const img2 = await sharp({
        create: {
          background: { b: 255, g: 0, r: 0 },
          channels: 3,
          height: 48,
          width: 48,
        },
      })
        .png()
        .toBuffer()
      await outputFile('img.png', img2)
      let message
      try {
        expect(img1).toMatchImage('img.png')
      } catch (error) {
        message = error.message
      }
      expect(message).toEqual(
        'Expected the images to be equal, but they differ by 2304 pixels.'
      )
    }),
}
