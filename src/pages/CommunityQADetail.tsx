import { BsChevronLeft } from 'react-icons/bs';
import FooterMenu from '../components/common/FooterMenu';
import Header from '../components/common/Header';
import CommunityQACommentForm from '../components/q&aDetail/CommunityQACommentForm';
import CommunityQADetailAnswer from '../components/q&aDetail/CommunityQADetailAnswer';
import CommunityQADetailPost from '../components/q&aDetail/CommunityQADetailPost';

export default function () {
  return (
    <section>
      <div className="mt-9 flex h-full min-h-[calc(100vh-160px)] flex-col items-start gap-4 p-4 text-lightText dark:text-white">
        <Header type="community" title="Q	&#38; A 피드" icon={<BsChevronLeft />} />
        <CommunityQADetailPost />
        <CommunityQADetailAnswer />
        <CommunityQACommentForm />
      </div>
      <FooterMenu />
    </section>
  );
}
