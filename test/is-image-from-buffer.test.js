const fs = require('fs');
const path = require('path');
const { isImageFromBuffer } = require('../lib/utils/validation.js');

describe('isImageFromBuffer', () => {
  const testFilesDir = path.join(__dirname, 'files');
  const readTestFile = (filename) => {
    return fs.readFileSync(path.join(testFilesDir, filename));
  };

  test('should identify JPEG images', () => {
    const buffer = readTestFile('test.jpg');
    expect(isImageFromBuffer(buffer)).toEqual({
      isImage: true,
      format: 'jpeg',
    });
  });

  test('should identify PNG images', () => {
    const buffer = readTestFile('test.png');
    expect(isImageFromBuffer(buffer)).toEqual({ isImage: true, format: 'png' });
  });

  test('should identify GIF images', () => {
    const buffer = readTestFile('test.gif');
    expect(isImageFromBuffer(buffer)).toEqual({ isImage: true, format: 'gif' });
  });

  test('should identify WebP images', () => {
    const buffer = readTestFile('test.webp');
    expect(isImageFromBuffer(buffer)).toEqual({
      isImage: true,
      format: 'webp',
    });
  });

  test('should identify BMP images', () => {
    const buffer = readTestFile('test.bmp');
    expect(isImageFromBuffer(buffer)).toEqual({ isImage: true, format: 'bmp' });
  });

  test('should identify ICO images', () => {
    const buffer = readTestFile('test.ico');
    expect(isImageFromBuffer(buffer)).toEqual({ isImage: true, format: 'ico' });
  });

  test('should not identify text files as images', () => {
    const buffer = readTestFile('test.txt');
    expect(isImageFromBuffer(buffer)).toEqual({ isImage: false, format: null });
  });

  test('should not identify PDF files as images', () => {
    const buffer = readTestFile('test.pdf');
    expect(isImageFromBuffer(buffer)).toEqual({ isImage: false, format: null });
  });

  test('should handle empty buffers', () => {
    const buffer = Buffer.alloc(0);
    expect(isImageFromBuffer(buffer)).toEqual({ isImage: false, format: null });
  });
});
