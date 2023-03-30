import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpeg';
import profile3 from '../assets/profile3.jpg';

export function timeForToday(value: string) {
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 31) {
    return `${betweenTimeDay}일전`;
  }
  const betweenTimeMonth = Math.floor(betweenTime / 60 / 24 / 30);
  if (betweenTimeMonth >= 1 && betweenTimeMonth < 12) {
    return `${betweenTimeMonth}달전`;
  } else return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export interface commentDummyType {
  id: number;
  isRef: boolean;
  refId: number | null;
  displayName: string;
  profileImage: string;
  isOfPostAuthor: boolean;
  content: string;
  likeCount: number;
  createdAt: string;
  isLiked: boolean;
  isPinned: boolean;
}

export const commentArr: commentDummyType[] = [
  {
    id: 1,
    isRef: false,
    refId: null,
    displayName: 'Phoebe',
    profileImage: profile1,
    isOfPostAuthor: false,
    content: '저 핀 해주세요!!!!!🥇',
    likeCount: 10,
    createdAt: '2023 02 02 14:31:10',
    isLiked: false,
    isPinned: true,
  },
  {
    id: 2,
    isRef: false,
    refId: null,
    displayName: 'Joey',
    profileImage: profile2,
    isOfPostAuthor: false,
    content: 'HOW YOU DOINN',
    likeCount: 0,
    createdAt: '2022 10 10 14:31:10',
    isLiked: false,
    isPinned: false,
  },
  {
    id: 3,
    isRef: true,
    refId: 2,
    displayName: 'Chandler',
    profileImage: profile3,
    isOfPostAuthor: false,
    content: '대댓글입니다~',
    likeCount: 2,
    createdAt: '2023 03 15 14:31:10',
    isLiked: false,
    isPinned: false,
  },
  {
    id: 5,
    isRef: true,
    refId: 2,
    displayName: 'Phoebe',
    profileImage: profile1,
    isOfPostAuthor: false,
    content: '여기도 대댓글~',
    likeCount: 2,
    createdAt: '2023 03 13 14:31:10',
    isLiked: false,
    isPinned: false,
  },
  {
    id: 4,
    isRef: false,
    refId: null,
    displayName: 'Chandler',
    profileImage: profile3,
    isOfPostAuthor: false,
    content: '안녕하세요~~',
    likeCount: 3,
    createdAt: '2022 03 05 23:31:10',
    isLiked: true,
    isPinned: false,
  },
  {
    id: 6,
    isRef: false,
    refId: null,
    displayName: 'Joey',
    profileImage: profile2,
    isOfPostAuthor: false,
    content: '테스트입니다',
    likeCount: 3,
    createdAt: '2023 01 05 23:31:10',
    isLiked: true,
    isPinned: false,
  },
];
