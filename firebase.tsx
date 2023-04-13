// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAM_TR8SQwJGMU3vPc3UcGRddtyychQa84',
  authDomain: 'budproject-da24e.firebaseapp.com',
  projectId: 'budproject-da24e',
  storageBucket: 'budproject-da24e.appspot.com',
  messagingSenderId: '553292178134',
  appId: '1:553292178134:web:9c2d682ce5dc68c16e1f77',
  measurementId: 'G-PCYWPF0345',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
const VAPID_KEY = 'BGBMikI1-QuF8fwFB9tz7qzursPE8XiBUxxq2CGqK04L1nnZPl40IG3nV61d3bNyhfHyEVrf2DLiHmIA2y2-a98';
