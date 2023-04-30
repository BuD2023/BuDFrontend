import { OnSubmitType } from '../components/common/_Common.interface';
import { UserInfoEditInitialType } from '../pages/profile/MyProfileEdit';

export function toFormData(obj: Partial<OnSubmitType>) {
  const formData = new FormData();
  const { images, postTypeInfo, ...rest } = obj;
  const blob = new Blob([JSON.stringify(rest)], { type: 'application/json' });
  if (postTypeInfo === 'POST_CREATE') formData.append('createPostRequest', blob);
  if (postTypeInfo === 'POST_UPDATE') formData.append('updatePostRequest', blob);
  if (postTypeInfo === 'ANSWER_CREATE') formData.append('createQnaAnswerRequest', blob);
  if (postTypeInfo === 'ANSWER_UPDATE') formData.append('updateQnaAnswerRequest', blob);
  if (images) {
    console.log(images);
    Object.values(images).forEach((blob, i) => {
      let imgType;
      let type;
      let name = `BudImg(${Date.now()}${Math.random()})`;
      switch (images[i].type) {
        case 'image/png':
          imgType = 'image/png';
          type = '.png';
          break;
        case 'image/webp':
          imgType = 'image/webp';
          break;
        default:
          imgType = 'image/jpeg';
          type = '.jpeg';
      }
      const file = new File([blob], `${name}${i}${type}`, { type: imgType });
      formData.append(`images`, file);
    });
  }
  // 폼데이터 데이터 잘들어가나~ 확인!
  for (let x of (formData as FormData).entries()) {
    console.log(x);
  }
  return formData;
}

export function toFormDataOnUserInfo(userInfo: UserInfoEditInitialType) {
  const formData = new FormData();
  if (userInfo.file && typeof userInfo.file !== 'string') {
    let imgType;
    let type;
    let name = `BudImg(${Date.now()}${Math.random()})`;
    switch ((userInfo.file as Blob).type) {
      case 'image/png':
        imgType = 'image/png';
        type = '.png';
        break;
      case 'image/webp':
        imgType = 'image/webp';
        break;
      default:
        imgType = 'image/jpeg';
        type = '.jpeg';
    }
    const file = new File([userInfo.file], name + type, { type: imgType });
    formData.append(`file`, file);
  }
  if (userInfo.file && typeof userInfo.file === 'string') {
    formData.append('imagePath', userInfo.file as string);
  }
  formData.append('nickname', userInfo.nickname);
  formData.append('job', userInfo.job);
  if ((userInfo as UserInfoEditInitialType).introduceMessage) {
    formData.append('introduceMessage', (userInfo as UserInfoEditInitialType).introduceMessage as string);
  }
  for (let x of (formData as FormData).entries()) {
    console.log(x);
  }
  return formData;
}
