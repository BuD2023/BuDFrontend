import { getToken } from 'firebase/messaging';
import { messaging } from '../../firebase';
import { VAPID_KEY } from '../constant/union';

export async function requestPermission() {
  console.log('Requesting permission...');
  try {
    const response = await Notification.requestPermission();
    if (response === 'granted') {
      console.log('Notification permission granted.');
    }
  } catch (err) {
    console.log(err);
  }
}

export default async function sendFCMTokenFunc() {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      console.log(`fcmToken: ${currentToken}`);
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }
  return null;
}
