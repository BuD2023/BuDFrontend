import { InfiniteData } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import FooterMenu from '../components/common/FooterMenu';
import ScrapPostFormat from '../components/common/ScrapPostFormat';
import ScrollToTopBtn from '../components/common/ScrollToTopBtn';
import FeedPostFormat from '../components/myProfile/FeedPostFormat';
import MyProfileHeader from '../components/myProfile/MyProfileHeader';
import MyProfileInfo from '../components/myProfile/MyProfileInfo';
import MyProfileMenu from '../components/myProfile/MyProfileMenu';
import { S3_URL } from '../constant/union';
import { useMyProfileQuery, useMyScrapsQuery } from '../store/module/useMyProfileQuery';
import { useProfilePostQuery } from '../store/module/useProfilePostQuery';

export default function MyProfile() {
  const initialPostView = useParams();
  const [postView, setPostView] = useState(initialPostView.filter ?? 'FEED');
  const navigate = useNavigate();
  const userId = 4;

  const { data: myProfileData, isLoading: myProfileIsLoading, error: myProfileError } = useMyProfileQuery();
  const {
    data: myScrapsData,
    isLoading: myScrapsIsLoading,
    error: myScrapsError,
    isFetching: myScrapsIsFetching,
    isFetchingNextPage: myScrapsIsFetchingNextPage,
    fetchNextPage: myScrapsFetchNextPage,
    hasNextPage: myScrapsHasNextPage,
  } = useMyScrapsQuery('POST_DATE,DESC');
  const {
    data: profilePostData,
    isLoading: profilePostIsLoading,
    error: profilePostError,
    isFetching: profilePostIsFetching,
    isFetchingNextPage: profilePostIsFetchingNextPage,
    fetchNextPage: profilePostFetchNextPage,
    hasNextPage: profilePostHasNextPage,
  } = useProfilePostQuery(Number(userId), postView === 'scrap' ? 'FEED' : postView.toUpperCase());

  // 인피니티 스크롤
  const { ref, inView } = useInView();

  useEffect(() => {
    if (postView === 'scrap' && inView && myScrapsHasNextPage && !myScrapsIsFetching && !myScrapsIsFetchingNextPage) myScrapsFetchNextPage();
    if (postView === 'feed' && inView && profilePostHasNextPage && !profilePostIsFetching && !profilePostIsFetchingNextPage) profilePostFetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (postView === 'scrap') myScrapsFetchNextPage();
    if (postView === 'feed') profilePostFetchNextPage();
  }, [postView]);

  if (myProfileError || myScrapsError || profilePostError) {
    navigate('/NotFound');
  }

  // console.log(myScrapsData);
  // console.log(profilePostData);

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative flex min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-lightIvory p-4 pt-0 text-lightText dark:bg-darkNavy dark:text-white">
        <MyProfileHeader
          userId={myProfileData?.userId as string}
          job={myProfileData?.job as string}
          nickName={myProfileData?.nickName as string}
          profileUrl={(S3_URL + myProfileData?.profileUrl) as string}
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
        {/* {myScrapsData && postView === 'scrap' && <ScrapPostFormat resultData={myScrapsData.pages.flatMap((page) => page.content)} />} */}
        {/* {profilePostData && postView !== 'scrap' && <FeedPostFormat type="feed" resultData={profilePostData.pages.flatMap((page) => page.content)} />} */}
      </div>
      <div ref={ref} />
      <FooterMenu />
    </section>
  );
}
