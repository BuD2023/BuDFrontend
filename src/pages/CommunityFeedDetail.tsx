import { BsChevronLeft } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import FooterMenu from '../components/common/FooterMenu';
import Header from '../components/common/Header';
import CommunityFeedCommentForm from '../components/feedDetail/CommunityFeedCommentForm';
import CommunityDetailPost from '../components/feedDetail/CommunityDetailPost';

export default function CommunityFeedDetail() {
  const { id } = useParams();
  return (
    <section>
      <div className="mt-9 flex h-full min-h-[calc(100vh-160px)] flex-col items-start gap-2 p-4 dark:text-white">
        <Header type="community" title="개발 피드" icon={<BsChevronLeft />} postId={id} />
        <CommunityDetailPost />
        <CommunityFeedCommentForm />
      </div>
      <FooterMenu />
    </section>
  );
}
