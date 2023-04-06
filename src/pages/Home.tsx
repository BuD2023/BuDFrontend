import FooterMenu from '../components/common/FooterMenu';
import HomeTitle from '../components/home/HomeTitle';
import HomeLevelSection from '../components/home/HomeLevelSection';
import HomeCommitSection from '../components/home/HomeCommitSection';
import HomeCommitCalendar from '../components/home/HomeCommitCalendar';
import { useState } from 'react';
import { getImgFromCloudinary } from '../module/cloudinary';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <section>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white">
        <HomeTitle />
        <HomeLevelSection />
        <HomeCommitSection />
        <HomeCommitCalendar />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getImgFromCloudinary(imageUrl as string);
          }}
        >
          <input type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
          <button type="submit">Upload Image</button>
        </form>
      </div>
      <FooterMenu />
    </section>
  );
}
