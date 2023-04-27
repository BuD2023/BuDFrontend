import imageCompression from 'browser-image-compression';

//이미지 압축
const actionImgCompress = async (fileSrc: File) => {
  const options = {
    maxSizeMB: 0.6,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(fileSrc, options);
    console.log('compressed', compressedFile);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
};
export default actionImgCompress;
