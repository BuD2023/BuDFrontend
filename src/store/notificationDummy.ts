export interface INotificationType {
  notificationId: number; // 알림 고유 id
  type: string; // 'follow', 'post' 알림 타입 정의
  page: string; // 'otherProfile', 'qna', 'feed' => 그 알림 클릭했을 떄 이동할 페이지
  pageDetail: string; // 페이지 id or 유저 id => 페이지의 id(params 값)
  alertType: string; // 'followed', 'newPost', 'comment', 'like', 'answer(답변)', 'pin'
  senderId: string; // 알림 보낸 사람
  status: boolean; // 읽음(true), 읽지 않음(false) (+) 기본 = false
}

export const notificationDummy: INotificationType[] = [
  {
    notificationId: 1,
    type: 'follow',
    page: 'otherProfile', // 'qna', 'feed', 'otherProfile'
    pageDetail: 'asdf', // 유저 id
    alertType: 'followed',
    senderId: 'asdf',
    status: false, // 읽음, 읽지 않음
  },
  {
    notificationId: 2,
    type: 'follow',
    page: 'qna', // 'qna', 'feed', 'otherProfile'
    pageDetail: '3', // 페이지의 아이디값
    alertType: 'newPost',
    senderId: 'kds',
    status: false, // 읽음, 읽지 않음
  },
  {
    notificationId: 3,
    type: 'post',
    page: 'feed', // 'qna', 'feed', 'otherProfile'
    pageDetail: '1', // 페이지의 아이디값
    alertType: 'comment',
    senderId: 'kjh',
    status: false, // 읽음, 읽지 않음
  },
  {
    notificationId: 4,
    type: 'post',
    page: 'feed', // 'qna', 'feed', 'otherProfile'
    pageDetail: '1', // 페이지의 아이디값
    alertType: 'like',
    senderId: 'longlongVeryLongID',
    status: false, // 읽음, 읽지 않음
  },
  {
    notificationId: 5,
    type: 'post',
    page: 'qna', // 'qna', 'feed', 'otherProfile'
    pageDetail: '1', // 페이지의 아이디값
    alertType: 'answer',
    senderId: 'kjh',
    status: false, // 읽음, 읽지 않음
  },
  {
    notificationId: 6,
    type: 'post',
    page: 'qna', // 'qna', 'feed', 'otherProfile'
    pageDetail: '1', // 페이지의 아이디값
    alertType: 'pin',
    senderId: 'kjh',
    status: false, // 읽음, 읽지 않음
  },
];
