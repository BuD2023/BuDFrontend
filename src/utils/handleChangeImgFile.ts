import { makeCompressedImg } from './makeCompressedImg';
import { toFileURLs } from './toFileURLs';

export const handleFileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const fileArr = e.target.files as FileList;
  const compressedFiles = await makeCompressedImg(fileArr);
  const compressedFileURLs = await toFileURLs(compressedFiles as File[]);
  return {
    file: compressedFiles,
    url: compressedFileURLs,
  };
};
