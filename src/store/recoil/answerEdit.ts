import { atom } from 'recoil';

interface initialValueType {
  content: string;
  images: string[];
}

export const answerEdit = atom({
  key: 'answerEdit',
  default: undefined as undefined | initialValueType,
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = sessionStorage.getItem('answerEdit');
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData));

      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      onSet((newValue, _, isReset) => {
        isReset ? sessionStorage.removeItem('answerEdit') : sessionStorage.setItem('answerEdit', JSON.stringify(newValue));
      });
    },
  ],
});
