import { atom } from 'recoil';

export const selectedPageId = atom<number>({
  key: 'pageIdState',
  default: 0,
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = sessionStorage.getItem('pageId');
      // setSelf: atom 값을 설정 혹은 재설정
      if (savedData) setSelf(JSON.parse(savedData));

      // atom이 변화가 감지될 때 작동, Storage에 데이터 저장
      // setSelf에 의해서는 작동하지 않음
      onSet((newValue, _, isReset) => {
        isReset ? sessionStorage.removeItem('pageId') : sessionStorage.setItem('pageId', JSON.stringify(newValue));
      });
    },
  ],
});

export const deletedNotiId = atom<string>({
  key: 'notiIdState',
  default: '',
});
