import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';
import { useNavigate } from 'react-router-dom';
import { useGithubQuery } from '../store/module/useGithubQuery';
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

export default function Home() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGithubQuery();

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  const firebaseConfig = {
    apiKey: 'AIzaSyAM_TR8SQwJGMU3vPc3UcGRddtyychQa84',
    authDomain: 'budproject-da24e.firebaseapp.com',
    projectId: 'budproject-da24e',
    storageBucket: 'budproject-da24e.appspot.com',
    messagingSenderId: '553292178134',
    appId: '1:553292178134:web:9c2d682ce5dc68c16e1f77',
    measurementId: 'G-PCYWPF0345',
  };

  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging();
  const VAPID_KEY = 'BGBMikI1-QuF8fwFB9tz7qzursPE8XiBUxxq2CGqK04L1nnZPl40IG3nV61d3bNyhfHyEVrf2DLiHmIA2y2-a98';

  // getToken(messaging, { vapidKey: VAPID_KEY })
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       console.log('됐음');
  //       console.log(currentToken);
  //     } else {
  //       console.log('No registration token available. Request permission to generate one.');
  //     }
  //   })
  //   .catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err);
  //   });

  return (
    <section>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        {data !== undefined && (
          <>
            <HomeTitle nickName={data.nickName} />
            <HomeLevelSection levelCode={data.levelCode} remainCommitCountNextLevel={data.remainCommitCountNextLevel} />
            <HomeCommitSection todayCommitCount={data.todayCommitCount} consecutiveCommitDays={data.consecutiveCommitDays} thisWeekCommitCount={data.thisWeekCommitCount} />
            <HomeCommitCalendar commits={data.commits} />
          </>
        )}

        <button onClick={() => navigate('/test')} className="mb-4 flex w-full items-center justify-center rounded-[20px] bg-greyBeige p-4 text-[22px] font-semibold dark:bg-sky">
          test
        </button>
        <button onClick={() => navigate('/test2')} className="mb-4 flex w-full items-center justify-center rounded-[20px] bg-greyBeige p-4 text-[22px] font-semibold">
          test2
        </button>
        <button onClick={() => navigate('/test3')} className="mb-4 flex w-full items-center justify-center rounded-[20px] bg-greyBeige p-4 text-[22px] font-semibold">
          test3
        </button>
      </div>
      <FooterMenu />
    </section>
  );
}
