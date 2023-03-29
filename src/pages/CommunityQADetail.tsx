import CommunityQACommentForm from '../components/q&aDetail/CommunityQACommentForm';
import CommunityQADetailAnswer from '../components/q&aDetail/CommunityQADetailAnswer';
import CommunityQADetailHeader from '../components/q&aDetail/CommunityQADetailHeader';
import CommunityQADetailPost from '../components/q&aDetail/CommunityQADetailPost';

export default function () {
  return (
    <section>
      <div className="flex h-full min-h-screen flex-col items-start gap-4 p-4 text-white">
        <CommunityQADetailHeader />
        <CommunityQADetailPost />
        <CommunityQADetailAnswer />
        <CommunityQACommentForm />
      </div>
    </section>
  );
}
