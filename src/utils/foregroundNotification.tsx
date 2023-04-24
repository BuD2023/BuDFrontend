import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getFcmToken, onMessageListener } from './fcm';

// 앱에서 푸시 알림을 표시하는 컴포넌트
const foregroundNotification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const notify = () => toast(<ToastDisplay />);

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    getFcmToken();
  }, []);

  // useEffect(() => {
  //   onMessageListener()
  //     .then((payload) => {
  //       setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
  //     })
  //     .catch((err) => console.log('failed: ', err));
  // }, []);

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  return <Toaster />;
};
