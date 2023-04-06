import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { byAngle } from '@cloudinary/url-gen/actions/rotate';
// export const imgFromCloudinary = (url: string, width: number) => {
//   // new CloudinaryImage(url).resize(scale().width(width)).delivery(format(webp()));
//   const cloudinaryCore = new Cloudinary.
// };

export const getImgFromCloudinary = async (url: string) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dft72uk4u',
    },
  });

  const formData = new FormData();
  formData.append('file', url);
  formData.append('upload_preset', 'z11e3l2v'); // Replace with your actual upload preset name
  const options = {
    method: 'POST',
    body: formData,
  };
  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/ddbovp2je/image/upload', options);
    const data = await response.json();
    const result = data.secure_url;
    console.log(result.replace(/upload\//, 'upload/w_500,h_400,c_scale/').replace(/\.(jpe?g|png)$/, '.webp'));

    return cld.image(result.match(/\/([^/]+)\.[^.]+$/)[1]);
  } catch (error) {
    console.error(error);
  }
};
