import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { VAPID_KEY } from '../constant/union';
import { firebaseApp } from '../../firebase';

export const firebaseMessaging = getMessaging(firebaseApp);

export async function getFcmToken() {
  console.log('권한 요청 중...');
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'denied') {
      console.log('알림 권한 허용 안됨');
      return;
    }
    console.log('알림 권한이 허용됨');
    const token = await getToken(firebaseMessaging, {
      vapidKey: VAPID_KEY,
    });
    if (token) {
      console.log('fcm.tsx(getFcmToken 성공): ' + token);
    } else {
      console.log('fcm.tsx(ERROR): token 가져올 수 없음');
    }
    return 'fGepswSBCRctUYjWOofotr:APA91bFGPBopTcHTfumq5JZa77O-oS3J-RDqXcGTxQb_nUVcRv7eL-BcZrjwjlg8OAPHTT5awbb-n680YavG5-kqippLL2RUw8O2yJXOc37qNCAchN7Ne1TnNE0x2oR-JYvuUXxVnAkn';
  } catch (error) {
    alert('브라우저에서 알림이 차단되어있습니다. 알림 받기를 원하시면, 브라우저 웹 설정에서 알림을 허용해주세요!');
    console.log(error);
    return undefined;
  }
}

// onMessage 이벤트가 발생할 때마다 payload 인자를 Promise의 해결 값으로 반환 => 앱에서 FCM 푸시 알림 메시지 처리 O
// 이 함수를 사용하여 앱이 포그라운드에 있을 때 FCM에서 수신된 푸시 알림 메시지를 처리할 수 있습니다. => 왜 안됨?
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(firebaseMessaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
    });
  });
