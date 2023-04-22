import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
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
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'denied') {
      console.log('알림 권한 허용 안됨');
      return;
    }
    console.log('알림 권한이 허용됨');
    const token = await getToken(foregroundMessaging, {
      vapidKey: VAPID_KEY,
    });
    console.log(`FCMtoken: ${token}`);
    return token;
  } catch (error) {
    alert('브라우저에서 알림이 차단되어있습니다. 알림 받기를 원하시면, 브라우저 웹 설정에서 알림을 허용해주세요!');
    console.log(error);
    return undefined;
  }
}
