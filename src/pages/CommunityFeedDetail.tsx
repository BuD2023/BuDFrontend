import { BsChevronLeft } from 'react-icons/bs';
import FooterMenu from '../components/common/FooterMenu';
import Header from '../components/common/Header';
import CommunityFeedCommentForm from '../components/feedDetail/CommunityFeedCommentForm';
import CommunityFeedPost from '../components/feedDetail/CommunityFeedPost';

export default function CommunityFeedDetail() {
  return (
    <section>
      <div className="mt-9 flex h-full min-h-[calc(100vh-160px)] flex-col items-start gap-2 p-4 dark:text-white">
        <Header type="community" title="개발 피드" icon={<BsChevronLeft />} />
        <CommunityFeedPost />
        <CommunityFeedCommentForm />
      </div>
      <FooterMenu />
    </section>
  );
}
