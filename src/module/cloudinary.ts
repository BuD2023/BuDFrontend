// export const imgFromCloudinary = (url: string, width: number) => {
//   // new CloudinaryImage(url).resize(scale().width(width)).delivery(format(webp()));
//   const cloudinaryCore = new Cloudinary.
// };

export const getImgFromCloudinary = async (imgUrl: string) => {
  // event.preventDefault();
  const formData = new FormData();
  formData.append('file', imgUrl);
  formData.append('upload_preset', 'z11e3l2v'); // Replace with your actual upload preset name
  const options = {
    method: 'POST',
    body: formData,
  };
  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/ddbovp2je/image/upload', options);
    const data = await response.json();
    console.log(data.secure_url);
  } catch (error) {
    console.error(error);
  }
};
