import customAxios from './apiFetcher/customAxios';
import { initializeApp } from 'firebase/app';
import { onMessage } from 'firebase/messaging';
import { accessToken } from './main';
import { firebaseMessaging, getFcmToken } from './utils/fcm';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const backgroundMessaging = getMessaging(app);

async function requestPermission() {
  // 토큰 받기
  const token = await getFcmToken();

  // 토큰 서버에 보내기
  await customAxios({
    method: 'post',
    url: `/notification-info`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    // 나중에수정
    data: { fcmToken: token },
  });

  // foreground 알림 푸쉬 받기
  onMessage(firebaseMessaging, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
    const { title, body, image } = payload.notification;
    // title, body, image, tag 등의 데이터를 활용하여 메시지를 화면에 표시
    const notificationOptions = {
      body: body,
      icon: image,
    };
    // Notification을 사용하여 메시지를 화면에 표시
    self.registration.showNotification(title, notificationOptions);
  });
}

// onBackgroundMessage(backgroundMessaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png',
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

requestPermission();
