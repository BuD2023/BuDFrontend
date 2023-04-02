import chatImg1 from '../assets/chatImg1.jpg';
import chatImg2 from '../assets/chatImg2.jpeg';
import chatImg3 from '../assets/chatImg3.jpeg';
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpeg';
import profile3 from '../assets/profile3.jpg';

export interface IChatRoomType {
  roomId: number;
  roomName: string;
  tag: string[];
  des: string;
  memberId: string[];
  createdAt: string;
  host: {
    pic: string;
    name: string;
  };
}

export const chatRooms = [
  {
    roomId: 1,
    roomName: 'ChatGPT는 거짓말쟁이!',
    tag: ['인공지능', 'ChatGPT', 'AI'],
    des: 'ChatGPT와 인공지능, 그리고 가짜 뉴스에 관한 토크방입니다.',
    memberId: ['', '', '', '', '', '', '', '', '', '', '', ''],
    createdAt: '2023 03 26',
    host: {
      pic: profile1,
      name: 'Phoebe',
    },
  },
  {
    roomId: 2,
    roomName: '주니어 프엔 모여!',
    tag: ['주니어', 'work_life', '프론트엔드'],
    des: '새내기 주니어 응애들의 고민들을 나누어 봅니다.',
    memberId: ['', '', '', '', '', '', '', '', '', '', '', ''],
    createdAt: '2023 03 20',
    host: {
      pic: profile2,
      name: 'Joey',
    },
  },
  {
    roomId: 3,
    roomName: '국비지원 부트캠프생들 모여!',
    tag: ['국비지원', '부트캠프', '웹개발'],
    des: '국비지원, 부트캠프에서 웹 프론트엔드, 백엔드 개발을 배우는 취준생 분들의 고민을 나눕니다. 다 드루와 드루와~!',
    memberId: ['', '', '', '', '', '', '', '', '', '', '', ''],
    createdAt: '2023 03 06',
    host: {
      pic: profile3,
      name: 'Chandler',
    },
  },
] as IChatRoomType[];

export interface IChatsType {
  roomId: number;
  id: number;
  text: string;
  createdAt: string;
  from: boolean;
  pic: string;
  name: string;
  type: string;
}

export const chats = [
  {
    roomId: 1,
    id: 1,
    text: '챗지피티 그거 진짜 별로임',
    createdAt: '2023 04 02 00:40:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 1,
    id: 2,
    text: '마자마자',
    createdAt: '2023 04 02 00:42:10',
    from: false,
    pic: profile2,
    name: 'Joey',
    type: 'text',
  },
  {
    roomId: 1,
    id: 3,
    text: '끝말잊기도 못하드라',
    createdAt: '2023 04 02 00:48:10',
    from: false,
    pic: profile3,
    name: 'Chandler',
    type: 'text',
  },
  {
    roomId: 1,
    id: 4,
    text: '말 막 만들어내던데?',
    createdAt: '2023 04 02 01:10:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 1,
    id: 5,
    text: '왜왜 나 잘 쓰고 있음',
    createdAt: '2023 04 02 01:32:10',
    from: true,
    pic: '',
    name: 'Kody',
    type: 'text',
  },
  {
    roomId: 1,
    id: 6,
    text: '코딩할 떄 나름 쓸만 함!',
    createdAt: '2023 04 02 01:33:10',
    from: true,
    pic: '',
    name: 'Kody',
    type: 'text',
  },
  {
    roomId: 1,
    id: 7,
    text: '에이~ 거짓말!',
    createdAt: '2023 04 02 01:42:10',
    from: false,
    pic: profile2,
    name: 'Joey',
    type: 'text',
  },
  {
    roomId: 1,
    id: 8,
    text: '안믿음 ㅅㄱ',
    createdAt: '2023 04 02 01:45:10',
    from: false,
    pic: profile3,
    name: 'Chandler',
    type: 'text',
  },
  {
    roomId: 1,
    id: 9,
    text: chatImg1,
    createdAt: '2023 04 02 01:48:10',
    from: true,
    pic: '',
    name: 'Kody',
    type: 'pic',
  },
  {
    roomId: 2,
    id: 1,
    text: '고민이 있습니다...다들 얘기좀 들어봐봐요',
    createdAt: '2023 04 02 00:40:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 2,
    id: 2,
    text: '진짜 회사 넘 힘든데 퇴사할까 생각중',
    createdAt: '2023 04 02 00:41:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 2,
    id: 3,
    text: chatImg2,
    createdAt: '2023 04 02 00:48:10',
    from: false,
    pic: profile3,
    name: 'Chandler',
    type: 'pic',
  },
  {
    roomId: 2,
    id: 4,
    text: '무슨일이신가요',
    createdAt: '2023 04 02 01:10:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 2,
    id: 5,
    text: '?!',
    createdAt: '2023 04 02 01:32:10',
    from: true,
    pic: '',
    name: 'Kody',
    type: 'text',
  },
  {
    roomId: 2,
    id: 6,
    text: '아니 진짜.. 어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구 했음..',
    createdAt: '2023 04 02 01:45:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 2,
    id: 7,
    text: '헐...',
    createdAt: '2023 04 02 01:48:10',
    from: false,
    pic: profile2,
    name: 'Joey',
    type: 'text',
  },
  {
    roomId: 2,
    id: 8,
    text: '어떡해요?',
    createdAt: '2023 04 02 01:45:10',
    from: false,
    pic: profile3,
    name: 'Chandler',
    type: 'text',
  },
  {
    roomId: 2,
    id: 9,
    text: '그래도 퇴사는 좀....',
    createdAt: '2023 04 02 01:48:10',
    from: true,
    pic: '',
    name: 'Kody',
    type: 'text',
  },
  {
    roomId: 3,
    id: 1,
    text: '안녕하세요!',
    createdAt: '2023 04 02 00:40:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 3,
    id: 2,
    text: '다들 과제는 잘 되가고 계신가요?',
    createdAt: '2023 04 02 00:41:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 3,
    id: 3,
    text: chatImg3,
    createdAt: '2023 04 02 00:48:10',
    from: false,
    pic: profile3,
    name: 'Chandler',
    type: 'pic',
  },
  {
    roomId: 3,
    id: 4,
    text: '아 마리포 프로젝트 하기 바쁜데... 과제 제출 월요일 좀 그렇긴 하네요 ㅠㅠ',
    createdAt: '2023 04 02 01:10:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 3,
    id: 5,
    text: '고생이 많아요 여러분.. 할수있어요 힘을내요 힘',
    createdAt: '2023 04 02 01:32:10',
    from: true,
    pic: '',
    name: 'Kody',
    type: 'text',
  },
  {
    roomId: 3,
    id: 6,
    text: '하하하하',
    createdAt: '2023 04 02 01:45:10',
    from: false,
    pic: profile1,
    name: 'Phoebe',
    type: 'text',
  },
  {
    roomId: 3,
    id: 7,
    text: '난 몰라',
    createdAt: '2023 04 02 01:48:10',
    from: false,
    pic: profile2,
    name: 'Joey',
    type: 'text',
  },
  {
    roomId: 3,
    id: 8,
    text: 'ㅎㅇㅌㅎㅇㅌ',
    createdAt: '2023 04 02 01:45:10',
    from: false,
    pic: profile3,
    name: 'Chandler',
    type: 'text',
  },
  {
    roomId: 3,
    id: 9,
    text: '저는 여러분을 믿습니다ㅎㅎㅎ 최고최고👍',
    createdAt: '2023 04 02 01:48:10',
    from: true,
    pic: '',
    name: 'Kody',
    type: 'text',
  },
] as IChatsType[];
