import { atom } from 'recoil';
import { OrderType, SortType } from '../../components/community/_Community.interface';

interface initialSortValueType {
  sort: SortType;
  order: OrderType;
}

const initialSortingValue: initialSortValueType = {
  sort: 'DATE',
  order: 'DESC',
};

export const communitySorting = atom({
  key: 'communitySortingValue',
  default: initialSortingValue,
});
