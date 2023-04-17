import { getToken } from 'firebase/messaging';
import { messaging } from '../../firebase';

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
const VAPID_KEY = 'BGBMikI1-QuF8fwFB9tz7qzursPE8XiBUxxq2CGqK04L1nnZPl40IG3nV61d3bNyhfHyEVrf2DLiHmIA2y2-a98';

export default async function sendFCMTokenFunc() {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      console.log('됐음');
      console.log(currentToken);
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }
}
