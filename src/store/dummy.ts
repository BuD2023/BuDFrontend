export interface IBlogData {
  id: number;
  userName: string;
  type: string;
  likeCount: number;
  commentCount: number;
  img: string;
  title: string;
  detail: string;
  view: number;
  createdAt: string;
}

export const dummyData: IBlogData[] = [
  {
    id: 1,
    userName: 'BuD',
    type: 'feed',
    likeCount: 5,
    commentCount: 2,
    img: 'https://picsum.photos/105/105',
    title: '글 제목! 입니다',
    detail: '별하 예그리나 바나나 아름드리 이플 산들림 포도 가온누리 바람꽃 달볓 감사합니다 곰다시 비나리 안녕 소솜 별빛',
    view: 235,
    createdAt: '2023 03 27 13:31:41',
  },
  {
    id: 2,
    userName: '지현',
    type: 'qna',
    likeCount: 2,
    commentCount: 10,
    img: 'https://picsum.photos/105/105',
    title: '글 제목',
    detail: '별하 예그리나 바나나 아름드리 이플 산들림 포도 가온누리 바람꽃 달볓 감사합니다 곰다시 비나리 안녕 소솜 별빛',
    view: 235,
    createdAt: '2023 03 07 13:31:41',
  },
  {
    id: 3,
    userName: '동성',
    type: 'feed',
    likeCount: 7,
    commentCount: 26,
    img: 'https://picsum.photos/105/105',
    title: 'As the rental car rolled to a stop on the dark road, her fear increased by the moment.',
    detail: 'Nancy decided to make the porta-potty her home.',
    view: 235,
    createdAt: '2023 02 20 13:31:41',
  },
  {
    id: 4,
    userName: 'Bud',
    type: 'qna',
    likeCount: 12,
    commentCount: 2,
    img: 'https://picsum.photos/105/105',
    title: '글 제목',
    detail: '별하 예그리나 바나나 아름드리 이플 산들림',
    view: 235,
    createdAt: '2023 03 30 13:31:41',
  },
  {
    id: 5,
    userName: 'Bud',
    type: 'feed',
    likeCount: 9,
    commentCount: 2,
    img: 'https://picsum.photos/105/105',
    title: '그들의 가치를 그러므로 군영과 뭇 이상의 작고 봄바람이다. 일월과 찾아다녀도, 품고 유소년에게서 위하여 그들의 청춘의 칼이다.',
    detail: '별하 예그리나 바나나 아름드리 이플 산들림 포도 가온누리 바람꽃 달볓',
    view: 235,
    createdAt: '2023 04 02 03:31:41',
  },
];

export const jobList = [
  '게임',
  '네트워크·서버·보안',
  '프론트엔드개발',
  '모바일웹개발',
  '빅데이터·AI(인공지능)',
  '벡앤드개발',
  '소프트웨어·하드웨어',
  '시스템프로그래머',
  '응용프로그래머',
  'HTML·퍼블리싱·UI개발',
];

export const userInfos = {
  githubId: 'JHni2',
  currentCommitCount: 232,
  nickName: '젼님',
  growthLevel: 1,
};
