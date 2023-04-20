import { InfiniteData } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import FooterMenu from '../components/common/FooterMenu';
import ScrapPostFormat from '../components/common/ScrapPostFormat';
import ScrollToTopBtn from '../components/common/ScrollToTopBtn';
import MyProfileHeader from '../components/myProfile/MyProfileHeader';
import MyProfileInfo from '../components/myProfile/MyProfileInfo';
import MyProfileMenu from '../components/myProfile/MyProfileMenu';
import { useMyProfileQuery, useMyScrapsQuery } from '../store/module/useMyProfileQuery';

export default function MyProfile() {
  const initialPostView = useParams();
  const [postView, setPostView] = useState(initialPostView.filter ?? 'feed');
  const navigate = useNavigate();

  const { data: myProfileData, isLoading: myProfileIsLoading, error: myProfileError } = useMyProfileQuery();
  const { data: myScrapsData, isLoading: myScrapsIsLoading, error: myScrapsError, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useMyScrapsQuery('postId,DESC');

  // 인피니티 스크롤
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (postView === 'scrap') fetchNextPage();
  }, [postView]);

  if (myProfileError || myScrapsError) {
    navigate('/NotFound');
  }

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative flex min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-lightIvory p-4 pt-0 text-lightText dark:bg-darkNavy dark:text-white">
        <MyProfileHeader
          userId={myProfileData?.userId as string}
          nickName={myProfileData?.nickName as string}
          profileUrl={myProfileData?.profileUrl as string}
          description={myProfileData?.description as string}
          isLoading={myProfileIsLoading}
        />
        <MyProfileInfo
          level={myProfileData?.level as number}
          followers={myProfileData?.numberOfFollowers as number}
          follows={myProfileData?.numberOfFollows as number}
          posts={myProfileData?.numberOfPosts as number}
          isLoading={myProfileIsLoading}
        />
        <MyProfileMenu postView={postView} setPostView={setPostView} />
        {myScrapsData && postView === 'scrap' && <ScrapPostFormat resultData={myScrapsData.pages.flatMap((page) => page.content)} />}
      </div>
      <div ref={ref} />
      <FooterMenu />
    </section>
  );
}
