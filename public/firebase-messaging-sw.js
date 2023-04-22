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

// function showCustomBanner(title, body, icon) {
//   // 배너 DOM 요소 생성
//   const banner = document.createElement('div');
//   banner.className = 'custom-banner'; // 배너에 원하는 CSS 클래스 이름 부여

//   // 배너 내용 설정
//   const titleElement = document.createElement('h1');
//   titleElement.textContent = title;
//   banner.appendChild(titleElement);

//   const bodyElement = document.createElement('p');
//   bodyElement.textContent = body;
//   banner.appendChild(bodyElement);

//   const iconElement = document.createElement('img');
//   iconElement.src = icon;
//   banner.appendChild(iconElement);

//   // 배너를 body에 추가
//   document.body.appendChild(banner);

//   // 애니메이션 효과를 위해 setTimeout 내부로 이동
//   setTimeout(() => {
//     banner.style.transform = 'translateY(0)';
//     banner.style.opacity = '1';
//   }, 100);

//   // 일정 시간 후 배너 제거
//   setTimeout(() => {
//     banner.style.transform = 'translateY(-100%)';
//     banner.style.opacity = '0';
//     setTimeout(() => {
//       banner.remove();
//     }, 300);
//   }, 5000); // 5초 후 배너 제거 (원하는 시간으로 수정 가능)
// }
