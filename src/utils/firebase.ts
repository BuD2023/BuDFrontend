import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { VAPID_KEY } from '../constant/union';

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
export const foregroundMessaging = getMessaging(app);

export async function getFcmToken() {
  console.log('권한 요청 중...');

  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('알림 권한 허용 안됨');
    return;
  }

  console.log('알림 권한이 허용됨');

  const token = await getToken(foregroundMessaging, {
    vapidKey: VAPID_KEY,
  });
  return token;
}

// onMessage 이벤트가 발생할 때마다 payload 인자를 Promise의 해결 값으로 반환 => 앱에서 FCM 푸시 알림 메시지 처리 O
// 이 함수를 사용하여 앱이 포그라운드에 있을 때 FCM에서 수신된 푸시 알림 메시지를 처리할 수 있습니다. => 왜 안됨?
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(foregroundMessaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
    });
  });
