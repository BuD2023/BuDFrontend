import { BsChevronLeft } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import CommunityCommentForm from '../../components/feedDetail/CommunityCommentForm';
import CommunityDetailPost from '../../components/feedDetail/CommunityDetailPost';

export default function CommunityFeedDetail() {
  const { id } = useParams();
  return (
    <section>
      <div className="mb-[80px] mt-9 flex h-full min-h-[calc(100vh-160px)] flex-col items-start gap-2 p-4 dark:text-white">
        <Header type="community" title="개발 피드" icon={<BsChevronLeft />} postId={id} />
        <CommunityDetailPost />
        <CommunityCommentForm type="FEED" />
      </div>
    </section>
  );
}
