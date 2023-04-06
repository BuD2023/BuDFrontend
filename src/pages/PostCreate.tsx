import React from 'react';
import Header from '../components/common/Header';
import { BsChevronLeft } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { RxTriangleDown } from 'react-icons/rx';
import { AiFillPicture } from 'react-icons/ai';
import PicModal from '../components/common/PicModal';

export default function PostCreate() {
  // 게시글 전체 정보
  const [postInfo, setPostInfo] = useState({
    title: '',
    des: '',
    type: '개발 피드',
    pic: [] as (string | ArrayBuffer | null)[],
  });

  //게시글 타입
  const postTypes = ['개발 피드', 'Q & A 피드 '];
  const [isClick, setIsClick] = useState(true);

  // 사진 업로드
  const imgRef = useRef<HTMLInputElement>(null);
  const handleChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files as FileList;
    let fileURLs: (string | ArrayBuffer | null)[] = [];
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;
    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setPostInfo({ ...postInfo, pic: [...fileURLs] });
      };
      reader.readAsDataURL(file);
    }
  };

  // 사진 popUp
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <section className="inset-0 flex flex-col gap-7 py-4 px-6 text-lightText dark:text-white">
        <Header type="withMainBtn" title="글쓰기" icon={<BsChevronLeft />} onSubmit={postInfo} />
        <div className="mt-9 flex h-full flex-col gap-8 px-2 pt-10">
          <div className="flex flex-col gap-4 text-xl font-medium">
            <div className="flex w-full flex-col items-center text-[18px] font-semibold">
              <button
                onClick={() => setIsClick(!isClick)}
                type="button"
                className="mb-2 flex h-[54px] w-full items-center rounded-[20px] bg-midIvory p-2 px-4 text-start text-[21px] dark:bg-lightNavy"
              >
                <span className="grow text-[18px] font-semibold">{postInfo.type}</span>
                <RxTriangleDown className="text-[40px] opacity-50" />
              </button>
              <ul className={`w-full overflow-hidden rounded-[20px] bg-midIvory px-4 transition-all dark:bg-lightNavy ${isClick ? 'h-0' : 'h-[124px] py-2'}`}>
                <div className="scroll max-h-[45vh] overflow-auto">
                  {postTypes.map((job) => (
                    <li key={job} className="my-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPostInfo({ ...postInfo, type: e.currentTarget.innerText });
                          setIsClick(true);
                        }}
                        type="button"
                        className="w-full p-1 px-4 text-start hover:rounded-[20px] hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-[#506779] dark:hover:bg-opacity-50"
                      >
                        {job}
                      </button>
                    </li>
                  ))}
                </div>
              </ul>
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
                placeholder="제목"
                className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 text-[16px] placeholder:font-semibold  placeholder:text-[#7b6d6d] placeholder:opacity-80 focus:outline-none dark:bg-lightNavy dark:placeholder:text-white"
              />
              <input ref={imgRef} type="file" accept="image/*" multiple onChange={handleChangeProfileImg} className="hidden" />
              <div onClick={() => imgRef?.current?.click()} className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-midIvory dark:bg-lightNavy">
                <AiFillPicture className="opacity-80" />
              </div>
            </div>
            <div className={`${!isClick ? 'h-[calc(100vh-414px)]' : 'h-[calc(100vh-290px)]'} flex w-full flex-col gap-2 transition-all`}>
              {postInfo.pic.length > 0 && (
                <div className="flex w-full shrink-0 items-center gap-2 overflow-auto rounded-[20px] bg-midIvory p-2">
                  {postInfo.pic.map((img, idx) => (
                    <img
                      onClick={(e) => {
                        setIsPicPopUp({
                          open: true,
                          pic: img as string,
                        });
                      }}
                      key={idx}
                      src={img as string}
                      className="pre-img h-[120px] w-[120px] cursor-pointer rounded-[20px] object-cover"
                    />
                  ))}
                </div>
              )}
              <textarea
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    des: e.target.value,
                  })
                }
                value={postInfo.des}
                placeholder="내용을 입력하세요"
                className="h-full w-full cursor-pointer rounded-[20px] bg-midIvory p-4 text-[16px] leading-5 transition-all placeholder:font-semibold placeholder:text-[#7b6d6d] placeholder:opacity-80 focus:outline-none dark:bg-lightNavy dark:placeholder:text-white"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
