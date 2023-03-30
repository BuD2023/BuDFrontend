import SimpleHeader from '../components/common/SimpleHeader';
import CommunityFeedCommentForm from '../components/feedDetail/CommunityFeedCommentForm';
import CommunityFeedPost from '../components/feedDetail/CommunityFeedPost';

export default function CommunityFeedDetail() {
  return (
    <section>
      <div className="flex h-full min-h-screen flex-col items-start gap-2  p-4 text-white">
        <SimpleHeader />
        <CommunityFeedPost />
        <CommunityFeedCommentForm />
      </div>
    </section>
  );
}
