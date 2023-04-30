self.addEventListener('install', function (e) {
  console.log(e, 'fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log(e, ': fcm sw activate..');
});

self.addEventListener('push', function (e) {
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: 'https://budproject.s3.ap-northeast-2.amazonaws.com/profiles/basic/1.png',
    ...resultData,
  };
  console.log('push: ', { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  const resultData = e.data.json();
  console.log('notification click');
  let url = '/coffeeChat';
  if (resultData.data.notificationType === 'FOLLOW') {
    url = `/otherProfile/${resultData.data.senderId}/feed`;
  }
  if (resultData.data.notificationType === 'POST') {
    if (resultData.data.pageType === 'QNA') url = `/communityQADetail/${resultData.data.pageId}`;
    if (resultData.data.pageType === 'FEED') url = `/communityFeedDetail/${resultData.data.pageId}`;
  }
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
