// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging } from 'firebase/messaging';

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

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);
