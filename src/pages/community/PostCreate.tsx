import { BsChevronLeft } from 'react-icons/bs';
import React, { useRef, useState } from 'react';
import { RxTriangleDown } from 'react-icons/rx';
import { AiFillPicture } from 'react-icons/ai';
import { CommunityPostType } from '../../components/community/_Community.interface';
import PicModal from '../../components/common/PicModal';
import Header from '../../components/common/Header';
import ImagePeek from '../../components/common/ImagePeek';
import { handleFileImage } from '../../utils/handleChangeImgFile';

export default function PostCreate() {
  //게시글 타입
  const postTypes = ['개발 피드', 'Q & A 피드'];
  const [isClick, setIsClick] = useState(true);
  const initialValue: Partial<CommunityPostType> = { postTypeInfo: 'POST_CREATE', title: '', content: '', postType: 'FEED', images: null };

  // 게시글 전체 정보
  const [postInfo, setPostInfo] = useState(initialValue);

  // 사진 미리보기
  const [imgPeek, setImgPeek] = useState<string[]>([]);

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
      <section className="inset-0 flex flex-col gap-7 px-6 py-4 text-lightText dark:text-white">
        <Header type="withMainBtn" title="글쓰기" icon={<BsChevronLeft />} onSubmit={postInfo} />
        <div className="mt-9 flex h-full flex-col gap-8 px-2 pt-10">
          <p className="flex w-full justify-center rounded-2xl bg-greyBeige py-2 font-semibold dark:bg-sky ">필수 항목들은 반드시 작성하셔야 합니다.</p>
          <div className="flex flex-col gap-4 text-xl font-medium">
            <div className="flex w-full flex-col items-center text-[18px] font-semibold">
              <button
                onClick={() => setIsClick(!isClick)}
                type="button"
                className="text-start mb-2 flex h-[54px] w-full items-center rounded-[20px] bg-midIvory p-2 px-4 text-[21px] dark:bg-lightNavy"
              >
                <span className="grow text-[18px] font-semibold">{postInfo.postType === 'FEED' ? '개발 피드' : 'Q & A'}</span>
                <RxTriangleDown className="text-[40px] opacity-50" />
              </button>
              <div className={`w-full overflow-hidden rounded-[20px] bg-midIvory px-4 transition-all dark:bg-lightNavy ${isClick ? 'h-0' : 'h-[124px] py-2'}`}>
                <ul className="scroll max-h-[45vh] overflow-auto">
                  {postTypes.map((job) => (
                    <li key={job} className="my-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPostInfo({ ...postInfo, postType: e.currentTarget.innerText === '개발 피드' ? 'FEED' : 'QNA' });
                          setIsClick(true);
                        }}
                        type="button"
                        className="text-start w-full p-1 px-4 hover:rounded-[20px] hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-[#506779] dark:hover:bg-opacity-50"
                      >
                        {job}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex w-full items-center gap-2">
              <input
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    title: e.target.value,
                  })
                }
                value={postInfo.title}
                type="text"
                placeholder="제목을 입력해주세요(필수)"
                className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 text-[16px] placeholder:font-semibold  placeholder:text-[#7b6d6d] placeholder:opacity-80 focus:outline-none dark:bg-lightNavy dark:placeholder:text-white"
              />
              <input ref={imgRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
              <div onClick={() => imgRef?.current?.click()} className="flex h-[54px] w-[54px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-midIvory dark:bg-lightNavy">
                <AiFillPicture className="opacity-80" />
              </div>
            </div>
            <div className={`${!isClick ? 'h-[calc(100vh-480px)]' : 'h-[calc(100vh-356px)]'} flex w-full flex-col gap-2 transition-all`}>
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
