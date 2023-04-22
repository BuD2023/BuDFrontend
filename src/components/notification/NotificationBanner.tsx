import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getFcmToken, onMessageListener } from '../../utils/firebase';
import { useNotification } from '../../utils/useNotification';

const NotificationBanner = () => {
  const { notification, setNotification } = useNotification();
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
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  getFcmToken();

  onMessageListener()
    .then((payload) => {
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log('failed: ', err));

  return <Toaster />;
};

export default NotificationBanner;
