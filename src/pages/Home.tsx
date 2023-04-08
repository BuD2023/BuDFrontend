import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [chatRoom, setChatRoom] = useState(null);

  const fetchChatRoom = async () => {
    try {
      setChatRoom(null);
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      // setChatRoom(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // fetchChatRoom();
  }, []);

  return (
    <section>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <HomeTitle />
        <HomeLevelSection />
        <HomeCommitSection />
        <HomeCommitCalendar />
      </div>
      <FooterMenu />
    </section>
  );
}
