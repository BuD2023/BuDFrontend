export interface IBlogData {
  id: number;
  userName: string;
  likeCount: number;
  commentCount: number;
  img: string;
  title: string;
  detail: string;
  view: number;
  date: string;
  time: string;
}

export const dummyData: IBlogData[] = [
  {
    id: 1,
    userName: 'BuD',
    likeCount: 12,
    commentCount: 2,
    img: 'https://picsum.photos/105/105',
    title: '글 제목! 입니다',
    detail: '별하 예그리나 바나나 아름드리 이플 산들림 포도 가온누리 바람꽃 달볓 감사합니다 곰다시 비나리 안녕 소솜 별빛',
    view: 235,
    date: '20023.03.27',
    time: '03/28  19:41',
  },
  {
    id: 2,
    userName: '지현',
    likeCount: 2,
    commentCount: 10,
    img: 'https://picsum.photos/105/105',
    title: '글 제목',
    detail: '별하 예그리나 바나나 아름드리 이플 산들림 포도 가온누리 바람꽃 달볓 감사합니다 곰다시 비나리 안녕 소솜 별빛',
    view: 235,
    date: '20023.03.27',
    time: '03/28  16:22',
  },
  {
    id: 3,
    userName: '동성',
    likeCount: 7,
    commentCount: 26,
    img: 'https://picsum.photos/105/105',
    title: 'As the rental car rolled to a stop on the dark road, her fear increased by the moment.',
    detail: 'Nancy decided to make the porta-potty her home.',
    view: 235,
    date: '20023.03.27',
    time: '03/28  19:21',
  },
  {
    id: 4,
    userName: 'Bud',
    likeCount: 12,
    commentCount: 2,
    img: 'https://picsum.photos/105/105',
    title: '글 제목',
    detail: '별하 예그리나 바나나 아름드리 이플 산들림',
    view: 235,
    date: '20023.03.27',
    time: '03/28  12:56',
  },
  {
    id: 5,
    userName: 'Bud',
    likeCount: 12,
    commentCount: 2,
    img: 'https://picsum.photos/105/105',
    title: '그들의 가치를 그러므로 군영과 뭇 이상의 작고 봄바람이다. 일월과 찾아다녀도, 품고 유소년에게서 위하여 그들의 청춘의 칼이다.',
    detail: '별하 예그리나 바나나 아름드리 이플 산들림 포도 가온누리 바람꽃 달볓',
    view: 235,
    date: '20023.03.27',
    time: '03/28  19:30',
  },
];
