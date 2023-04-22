import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import FooterMenu from '../../components/common/FooterMenu';
import FeedPostFormat from '../../components/myProfile/FeedPostFormat';
import OtherProfileHeader from '../../components/otherProfile/OtherProfileHeader';
import OtherProfileInfo from '../../components/otherProfile/OtherProfileInfo';
import OtherProfileMenu from '../../components/otherProfile/OtherProfileMenu';
import { useProfilePostQuery } from '../../store/module/useProfilePostQuery';
import { useUserProfileQuery } from '../../store/module/useUserProfileQuery';

export default function OtherProfile() {
  const [postView, setPostView] = useState<string>('feed');
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useUserProfileQuery(Number(id));
  const {
    data: profilePostData,
    isLoading: profilePostIsLoading,
    error: profilePostError,
    isFetching: profilePostIsFetching,
    isFetchingNextPage: profilePostIsFetchingNextPage,
    fetchNextPage: profilePostFetchNextPage,
    hasNextPage: profilePostHasNextPage,
    refetch: profilePostRefetch,
  } = useProfilePostQuery(Number(id), postView.toLocaleUpperCase());

  // 인피니티 스크롤
  const { ref, inView } = useInView();

  useEffect(() => {
    if ((postView === 'qna' || postView === 'feed') && inView && profilePostHasNextPage && !profilePostIsFetching && !profilePostIsFetchingNextPage) profilePostFetchNextPage();
  }, [inView]);

  useEffect(() => {
    if (postView === 'feed' || postView === 'qna') profilePostFetchNextPage();
  }, [postView]);

  if (error || profilePostError) {
    navigate('/NotFound');
  }

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section>
      <div className="relative flex min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 bg-lightIvory p-4 pt-0 text-lightText dark:bg-darkNavy dark:text-white">
        <OtherProfileHeader
          isLoading={isLoading}
          userId={data?.userId as string}
          job={data?.job as string}
          nickName={data?.nickName as string}
          profileUrl={data?.profileUrl as string}
          description={data?.description as string}
        />
        <OtherProfileInfo
          numberOfPosts={data?.numberOfPosts as number}
          numberOfFollowers={data?.numberOfFollowers as number}
          numberOfFollows={data?.numberOfFollows as number}
          level={data?.level as number}
          isFollowing={data?.isFollowing as boolean}
          isLoading={isLoading}
        />
        <OtherProfileMenu id={id} postView={postView} setPostView={setPostView} />
        {profilePostData && <FeedPostFormat refetch={profilePostRefetch} userData={data} resultData={profilePostData.pages.flatMap((page) => page.content)} />}
      </div>
      <div ref={ref} />
      <FooterMenu />
    </section>
  );
}
