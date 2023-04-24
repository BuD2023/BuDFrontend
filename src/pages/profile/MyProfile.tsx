import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import FooterMenu from '../../components/common/FooterMenu';
import ScrapPostFormat from '../../components/myProfile/ScrapPostFormat';
import ScrollToTopBtn from '../../components/common/ScrollToTopBtn';
import FeedPostFormat from '../../components/myProfile/FeedPostFormat';
import MyProfileHeader from '../../components/myProfile/MyProfileHeader';
import MyProfileInfo from '../../components/myProfile/MyProfileInfo';
import MyProfileMenu from '../../components/myProfile/MyProfileMenu';
import { S3_URL } from '../../constant/union';
import { useMyProfileQuery, useMyScrapsQuery } from '../../store/module/useMyProfileQuery';
import { useProfilePostQuery } from '../../store/module/useProfilePostQuery';

export default function MyProfile() {
  const initialPostView = useParams();
  const [postView, setPostView] = useState(initialPostView.filter ?? 'FEED');
  const navigate = useNavigate();

  const { data: myProfileData, isLoading: myProfileIsLoading, error: myProfileError, refetch } = useMyProfileQuery();
  const {
    data: myScrapsData,
    isLoading: myScrapsIsLoading,
    error: myScrapsError,
    isFetching: myScrapsIsFetching,
    isFetchingNextPage: myScrapsIsFetchingNextPage,
    fetchNextPage: myScrapsFetchNextPage,
    hasNextPage: myScrapsHasNextPage,
    refetch: myScrapsRefetch,
  } = useMyScrapsQuery();
  const {
    data: profilePostData,
    isLoading: profilePostIsLoading,
    error: profilePostError,
    isFetching: profilePostIsFetching,
    isFetchingNextPage: profilePostIsFetchingNextPage,
    fetchNextPage: profilePostFetchNextPage,
    hasNextPage: profilePostHasNextPage,
  } = useProfilePostQuery(Number(myProfileData?.id), postView === 'scrap' ? 'ALL' : postView.toUpperCase());

  // 인피니티 스크롤
  const { ref, inView } = useInView();

  useEffect(() => {
    if (postView === 'scrap' && inView && myScrapsHasNextPage && !myScrapsIsFetching && !myScrapsIsFetchingNextPage) myScrapsFetchNextPage();
    if ((postView === 'qna' || postView === 'feed') && inView && profilePostHasNextPage && !profilePostIsFetching && !profilePostIsFetchingNextPage) profilePostFetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (postView === 'scrap') myScrapsFetchNextPage();
    if ((myProfileData && postView === 'feed') || postView === 'qna') profilePostFetchNextPage();
  }, [postView, myProfileData]);

  if (myProfileError || myScrapsError || profilePostError) {
    navigate('/NotFound');
  }

  useEffect(() => {
    refetch();
  }, []);

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
        {profilePostData && postView !== 'scrap' && <FeedPostFormat userData={myProfileData} resultData={profilePostData.pages.flatMap((page) => page.content)} />}
        {myScrapsData && postView === 'scrap' && <ScrapPostFormat refetch={myScrapsRefetch} userData={myProfileData} resultData={myScrapsData.pages.flatMap((page) => page.content)} />}
      </div>
      <div ref={ref} />
      <FooterMenu />
    </section>
  );
}
