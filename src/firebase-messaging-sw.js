import customAxios from './apiFetcher/customAxios';
import { onMessage } from 'firebase/messaging';
import { firebaseMessaging, getFcmToken } from './utils/fcm';

// async function requestPermission(accessToken) {
//   // 토큰 받기
//   const token = await getFcmToken();

//   // 토큰 서버에 보내기
//   await customAxios({
//     method: 'post',
//     url: `/notification-info`,
//     headers: {
//       Authorization: accessToken,
//       'Content-Type': 'application/json',
//     },
//     // 나중에수정
//     data: { fcmToken: token },
//   });

//   // // foreground 알림 푸쉬 받기
//   // onMessage(firebaseMessaging, (payload) => {
//   //   console.log('메시지가 도착했습니다.', payload);
//   //   const { title, body, image } = payload.notification;
//   //   // title, body, image, tag 등의 데이터를 활용하여 메시지를 화면에 표시
//   //   const notificationOptions = {
//   //     body: body,
//   //     icon: image,
//   //   };
//   //   // Notification을 사용하여 메시지를 화면에 표시
//   //   self.registration.showNotification(title, notificationOptions);
//   // });
// }
// requestPermission();
