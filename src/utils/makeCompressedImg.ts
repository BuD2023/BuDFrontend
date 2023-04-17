import actionImgCompress from './imgCompress';

export const makeCompressedImg = async (fileArr: FileList) => {
  let filesLength = fileArr.length > 10 ? 10 : fileArr.length;
  console.log(fileArr);
  const compressedFiles = await Promise.all(
    Array.from(fileArr)
      .slice(0, filesLength)
      .map(async (file) => {
        return await actionImgCompress(file);
      })
  );
  return compressedFiles;
};
