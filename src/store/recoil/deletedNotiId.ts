import { atom } from 'recoil';
import { pageType } from '../../components/notification/_Notification.interface';
export interface notiPropsType {
  pageType: pageType;
  pageId: number;
  notiId: string;
}

export const selectedPageState = atom<undefined | Partial<notiPropsType>>({
  key: 'pageIdState',
  default: undefined as undefined | Partial<notiPropsType>,
});

export const deletedNotiId = atom<string>({
  key: 'notiIdState',
  default: '',
});
