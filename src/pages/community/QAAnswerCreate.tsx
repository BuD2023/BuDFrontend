import { BsChevronLeft } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { AiFillPicture } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useCommunityDetailQuery } from '../../store/module/useCommunityDetailQuery';
import { getCommunityDetailType, QnaAnswerType } from '../../components/community/_Community.interface';
import PicModal from '../../components/common/PicModal';
import QuestionModal from '../../components/common/QuestionModal';
import Header from '../../components/common/Header';
import { handleFileImage } from '../../utils/handleChangeImgFile';
import ImagePeek from '../../components/common/ImagePeek';

export default function QAAnswerCreate() {
  const { postId } = useParams();
  const [alertModal, setAlertModal] = useState(false);
  console.log(postId);

  // QNA 질문 글 정보
  const { isLoading, data, refetch } = useCommunityDetailQuery(Number(postId));
  const [qnaData, setQnaData] = useState<getCommunityDetailType>(data as getCommunityDetailType);
  useEffect(() => {
    refetch().then(() => setQnaData(data as getCommunityDetailType));
  }, [isLoading]);

  // 보낼 게시글 전체 정보
  const [postInfo, setPostInfo] = useState<Partial<QnaAnswerType>>({
    postTypeInfo: 'ANSWER_CREATE',
    postId: Number(postId),
    content: '',
    images: [],
  });

  // 사진 미리보기
  const [imgPeek, setImgPeek] = useState<string[] | ArrayBuffer[] | null[]>([]);

  // 사진 업로드
  const imgRef = useRef<HTMLInputElement>(null);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await handleFileImage(e);
    setImgPeek(result.url);
    setPostInfo({
      ...postInfo,
      images: result.file as Blob[],
    });
  };

  // 사진 popUp
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      {data !== undefined && <QuestionModal alertModal={alertModal} setAlertModal={setAlertModal} title={qnaData?.title} des={qnaData?.content} />}
      <section className="inset-0 flex flex-col gap-7 px-6 py-4 text-lightText dark:text-white">
        <Header type="withMainBtn" title="답변달기" icon={<BsChevronLeft />} onSubmit={postInfo} />
        <div className="mt-9 flex h-full flex-col gap-8 px-2 pt-10">
          <p className="flex w-full justify-center rounded-2xl bg-greyBeige py-2 font-semibold dark:bg-sky ">필수 항목들은 반드시 작성하셔야 합니다.</p>
          <div className="flex flex-col gap-4 text-xl font-medium">
            <div className="flex w-full flex-col items-center text-[18px] font-semibold">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="text-start flex h-[54px] w-full items-center overflow-hidden rounded-[20px] bg-midIvory p-2 px-4 text-[21px] dark:bg-lightNavy">
                  <div onClick={() => setAlertModal(!alertModal)} className="w-full grow cursor-pointer truncate text-[18px] font-semibold">
                    {qnaData?.title}
                  </div>
                </div>
                <div onClick={() => imgRef?.current?.click()} className="flex h-[54px] w-[54px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-midIvory dark:bg-lightNavy">
                  <AiFillPicture className="opacity-80" />
                </div>
              </div>
              <input ref={imgRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
            </div>
            <div className={`flex h-[calc(100vh-276px)] w-full flex-col gap-2 transition-all`}>
              <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={imgPeek as string[]} />
              <textarea
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    content: e.target.value,
                  })
                }
                value={postInfo.content}
                placeholder="내용을 입력해주세요(필수)"
                className="h-full w-full rounded-[20px] bg-midIvory p-4 text-[16px] leading-5 transition-all placeholder:font-semibold placeholder:text-[#7b6d6d] placeholder:opacity-80 focus:outline-none dark:bg-lightNavy dark:placeholder:text-white"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
