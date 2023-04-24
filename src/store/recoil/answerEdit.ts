import { atom } from 'recoil';

const initialValue = {
  content: '',
  images: [] as string[],
};

export const answerEdit = atom({
  key: 'answerEdit',
  default: initialValue,
});
