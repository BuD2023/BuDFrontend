import customAxios from './apiFetcher/customAxios';
import { initializeApp } from 'firebase/app';
import { onMessage } from 'firebase/messaging';
import { accessToken } from './main';
import { foregroundMessaging, getFcmToken } from './utils/firebase';
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
    data: { fcmToken: token },
  });

  // 토큰 있으면 콘솔 출력
  if (token) console.log('token: ', token);
  else console.log('Can not get Token');

  // foreground 알림 푸쉬 받기
  onMessage(foregroundMessaging, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
    // 수정하기
  });

  onBackgroundMessage(backgroundMessaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

requestPermission();
