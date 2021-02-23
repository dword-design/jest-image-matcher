import { readFileSync, writeFileSync } from 'fs-extra'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

export const toMatchImage = (received, expected, options = {}) => {
  if (typeof expected === 'string') {
    expected = readFileSync(expected)
  }
  const img1 = PNG.sync.read(received)
  const img2 = PNG.sync.read(expected)
  const diffImg = new PNG({ height: img1.height, width: img1.width })
  const diff = pixelmatch(
    img1.data,
    img2.data,
    diffImg.data,
    img1.width,
    img1.height
  )
  const pass = diff === 0
  if (!pass && options.diffPath) {
    writeFileSync(options.diffPath, PNG.sync.write(diffImg))
  }
  return {
    message: () =>
      pass
        ? 'Expected the images to differ, but they are equal.'
        : `Expected the images to be equal, but they differ by ${diff} pixels.`,
    pass,
  }
}
