import { makeCompressedImg } from './makeCompressedImg';

export const handleChangeProfileImg = async (e: React.ChangeEvent<HTMLInputElement>, setImgPeek: any, postInfo: any, setPostInfo: any) => {
  const fileArr = e.target.files as FileList;
  const compressedFiles = await makeCompressedImg(fileArr);
  const compressedFileURLs = await Promise.all(
    compressedFiles.map((compressed) => {
      return new Promise<string>((resolve) => {
        let reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(compressed as Blob);
      });
    })
  );
  setImgPeek(compressedFileURLs);
  setPostInfo({
    ...postInfo,
    images: compressedFiles as Blob[],
  });
};
