import { useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import AddBtn from '../components/common/AddBtn';
import FooterMenu from '../components/common/FooterMenu';
import Header from '../components/common/Header';
import CommunityDetailPost from '../components/feedDetail/CommunityDetailPost';
import CommunityQADetailAnswer from '../components/q&aDetail/CommunityQADetailAnswer';

export default function () {
  const { id } = useParams();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [answerPin, setAnswerPin] = useState<boolean>(false);
  const [questionUserId, setQuestionUserId] = useState<number>();

  return (
    <section>
      <div className="mb-[80px] mt-9 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 p-4 text-lightText dark:text-white">
        {!answerPin && <AddBtn url={`/answerCreate/${Number(id)}`} text="답변달기" />}
        <Header type="community" title="Q	&#38; A 피드" icon={<BsChevronLeft />} answerPin={answerPin} postId={id} />
        <CommunityDetailPost setQuestionUserId={setQuestionUserId} />
        <CommunityQADetailAnswer questionUserId={Number(questionUserId)} answerPin={answerPin} setAnswerPin={setAnswerPin} isCommentOpen={isCommentOpen} setIsCommentOpen={setIsCommentOpen} />
      </div>
      {!isCommentOpen && <FooterMenu />}
    </section>
  );
}
