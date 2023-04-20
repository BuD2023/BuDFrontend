import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FooterMenu from '../components/common/FooterMenu';
import OtherProfileHeader from '../components/otherProfile/OtherProfileHeader';
import OtherProfileInfo from '../components/otherProfile/OtherProfileInfo';
import OtherProfileMenu from '../components/otherProfile/OtherProfileMenu';
import { useUserProfileQuery } from '../store/module/useUserProfileQuery';

export default function OtherProfile() {
  const [postView, setPostView] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useUserProfileQuery(Number(id));

  if (error) {
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
        <OtherProfileMenu postView={postView} setPostView={setPostView} />
        {/* <PostFormat resultData={resultData} /> */}
      </div>
      <FooterMenu />
    </section>
  );
}
