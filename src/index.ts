import defu from 'defu';
import fs from 'fs-extra';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export interface JestImageMatcherOptions {
  diffPath: string | null;
  dumpDiffToConsole: boolean;
}

export const toMatchImage = (
  received: Buffer,
  expectedInput: Buffer | string,
  optionsInput: Partial<JestImageMatcherOptions> = {},
) => {
  const options = defu(optionsInput, {
    diffPath: null,
    dumpDiffToConsole: false,
  });

  const expected =
    typeof expectedInput === 'string'
      ? fs.readFileSync(expectedInput)
      : expectedInput;

  const img1 = PNG.sync.read(received);
  const img2 = PNG.sync.read(expected);
  const diffImg = new PNG({ height: img1.height, width: img1.width });

  const diff = pixelmatch(
    img1.data,
    img2.data,
    diffImg.data,
    img1.width,
    img1.height,
  );

  const compositeImg = new PNG({ height: img1.height, width: 3 * img1.width });
  PNG.bitblt(img1, compositeImg, 0, 0, img1.width, img1.height, 0, 0);

  PNG.bitblt(
    diffImg,
    compositeImg,
    0,
    0,
    img1.width,
    img1.height,
    img1.width,
    0,
  );

  PNG.bitblt(
    img2,
    compositeImg,
    0,
    0,
    img1.width,
    img1.height,
    2 * img1.width,
    0,
  );

  const pass = diff === 0;

  if (!pass && options.diffPath) {
    fs.writeFileSync(options.diffPath, PNG.sync.write(compositeImg));
  }

  return {
    message: () =>
      pass
        ? 'Expected the images to differ, but they are equal.'
        : [
            `Expected the images to be equal, but they differ by ${diff} pixels.`,
            ...(options.dumpDiffToConsole
              ? [
                  '',
                  `data:image/png;base64,${PNG.sync
                    .write(compositeImg)
                    .toString('base64')}`,
                ]
              : []),
          ].join('\n'),
    pass,
  };
};

declare module 'expect' {
  interface Matchers<R> {
    toMatchImage(
      expected: Buffer | string,
      options?: Partial<JestImageMatcherOptions>,
    ): R;
  }
}
