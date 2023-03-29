import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpeg';
import profile3 from '../assets/profile3.jpg';

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
  if (betweenTimeMonth >= 1 && betweenTimeMonth <= 12) {
    return `${betweenTimeMonth}달전`;
  } else return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export const commentArr: commentDummyType[] = [
  {
    id: 1,
    isRef: false,
    refId: null,
    displayName: '안녕',
    profileImage: profile1,
    isOfPostAuthor: false,
    content: '저 핀 해주세요!!!!!🥇',
    likeCount: 10,
    createdAt: '02 02 2023 14:31:10',
    isLiked: false,
    isPinned: true,
  },
  {
    id: 2,
    isRef: false,
    refId: null,
    displayName: '안녕',
    profileImage: profile2,
    isOfPostAuthor: false,
    content: '댓글을 적어 보아요~ 1등!',
    likeCount: 0,
    createdAt: '01 05 2023 14:31:10',
    isLiked: false,
    isPinned: false,
  },
  {
    id: 3,
    isRef: true,
    refId: 2,
    displayName: '안녕',
    profileImage: profile3,
    isOfPostAuthor: false,
    content: '답글도!!! 1.5등',
    likeCount: 2,
    createdAt: '03 08 2023 14:31:10',
    isLiked: false,
    isPinned: false,
  },
  {
    id: 4,
    isRef: false,
    refId: null,
    displayName: '안녕',
    profileImage: profile1,
    isOfPostAuthor: false,
    content: '안녕하세요~~',
    likeCount: 3,
    createdAt: '03 29 2023 23:31:10',
    isLiked: true,
    isPinned: false,
  },
];
