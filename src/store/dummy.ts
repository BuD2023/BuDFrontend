import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpeg';
import profile3 from '../assets/profile3.jpg';

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
  date: string;
  time: string;
}

export const dummyData: IBlogData[] = [
  {
    id: 1,
    userName: 'BuD',
    type: 'feed',
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
    type: 'qna',
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
    type: 'feed',
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
    type: 'qna',
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
    type: 'feed',
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

export const chatRooms = [
  {
    roomName: 'ChatGPT는 거짓말쟁이! 인공지능과 가짜뉴스에 대한 개발자 토크방',
    memberId: ['', '', '', '', '', '', '', '', '', '', '', ''],
    randomProfiles: [
      { pic: profile1, name: 'Phoebe', position: 'top-8 left-16' },
      { pic: profile2, name: 'Joey', position: 'top-4 left-8' },
      { pic: profile3, name: 'Chandler', position: 'top-0 left-0' },
    ],
  },
  {
    roomName: '주니어 프론트 개발자로서의 고민들... 나눕니다',
    memberId: ['', '', '', '', '', '', '', '', '', ''],
    randomProfiles: [
      { pic: profile1, name: 'Phoebe', position: 'top-8 left-16' },
      { pic: profile2, name: 'Joey', position: 'top-4 left-8' },
      { pic: profile3, name: 'Chandler', position: 'top-0 left-0' },
    ],
  },
  {
    roomName: '우리 빽둥이들 모이자!! [백엔드토크방]',
    memberId: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    randomProfiles: [
      { pic: profile1, name: 'Phoebe', position: 'top-8 left-16' },
      { pic: profile2, name: 'Joey', position: 'top-4 left-8' },
      { pic: profile3, name: 'Chandler', position: 'top-0 left-0' },
    ],
  },
];

export const chat = {
  content: ['챗지피티 그거 진짜 별로임', '마자마자', '걔 끝말잇기 못해'],
};

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

export const user = {
  githubId: 'JHni2',
  totalComitCount: 232,
  nickName: '젼님',
  grwoLevel: 1,
};
