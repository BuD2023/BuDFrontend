import { BsChevronLeft } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import AddBtn from '../components/common/AddBtn';
import FooterMenu from '../components/common/FooterMenu';
import Header from '../components/common/Header';
import CommunityQACommentForm from '../components/q&aDetail/CommunityQACommentForm';
import CommunityQADetailAnswer from '../components/q&aDetail/CommunityQADetailAnswer';
import CommunityQADetailPost from '../components/q&aDetail/CommunityQADetailPost';

export default function () {
  const { id } = useParams();
  return (
    <section>
      <div className="mb-[80px] mt-9 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 p-4 text-lightText dark:text-white">
        <AddBtn url={`/answerCreate/${id}`} text="답변달기" />
        <Header type="community" title="Q	&#38; A 피드" icon={<BsChevronLeft />} postId={id} />
        <CommunityQADetailPost />
        <CommunityQADetailAnswer />
      </div>
      <FooterMenu />
    </section>
  );
}
