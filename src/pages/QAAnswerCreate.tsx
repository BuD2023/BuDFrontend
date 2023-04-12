import React from 'react';
import Header from '../components/common/Header';
import { BsChevronLeft } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { AiFillPicture } from 'react-icons/ai';
import PicModal from '../components/common/PicModal';
import imageCompression from 'browser-image-compression';
import { useParams } from 'react-router-dom';

export default function QAAnswerCreate() {
  const { postId } = useParams();

  // 게시글 전체 정보
  const [postInfo, setPostInfo] = useState({
    postId: postId,
    title: 'useMemo는 언제 어떻게 쓰는게 좋을까요??',
    content: '',
    postType: 'QNA',
    imageUrl: [] as (string | ArrayBuffer | null)[],
  });
  console.log(postInfo);

  //이미지 압축
  const actionImgCompress = async (fileSrc: File) => {
    const options = {
      maxSizeMb: 0.1,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(fileSrc, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  };

  // 사진 업로드
  const imgRef = useRef<HTMLInputElement>(null);
  const handleChangeProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files as FileList;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    const compressedFiles = await Promise.all(
      Array.from(fileArr)
        .slice(0, filesLength)
        .map(async (file) => {
          return await actionImgCompress(file);
        })
    );

    const compressedFileURLs = await Promise.all(
      compressedFiles.map((compressed) => {
        return new Promise<string>((resolve) => {
          let reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(compressed as Blob);
        });
      })
    );

    setPostInfo({
      ...postInfo,
      imageUrl: [...compressedFileURLs],
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
        <Header type="withMainBtn" title="답변달기" icon={<BsChevronLeft />} onSubmit={postInfo} />
        <div className="mt-9 flex h-full flex-col gap-8 px-2 pt-10">
          <p className="flex w-full justify-center rounded-2xl bg-greyBeige py-2 font-semibold dark:bg-sky ">필수 항목들은 반드시 작성하셔야 합니다.</p>
          <div className="flex flex-col gap-4 text-xl font-medium">
            <div className="flex w-full flex-col items-center text-[18px] font-semibold">
              <div className="flex w-full items-center justify-between gap-2">
                <div className="text-start flex h-[54px] w-full items-center overflow-hidden rounded-[20px] bg-midIvory p-2 px-4 text-[21px] dark:bg-lightNavy">
                  <div className="w-full grow truncate text-[18px] font-semibold">{postInfo.title}</div>
                </div>
                <div onClick={() => imgRef?.current?.click()} className="flex h-[54px] w-[54px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-midIvory dark:bg-lightNavy">
                  <AiFillPicture className="opacity-80" />
                </div>
              </div>
              <input ref={imgRef} type="file" accept="image/*" multiple onChange={handleChangeProfileImg} className="hidden" />
            </div>
            <div className={`flex h-[calc(100vh-286px)] w-full flex-col gap-2 transition-all`}>
              {postInfo.imageUrl.length > 0 && (
                <div className="flex w-full shrink-0 items-center gap-2 overflow-auto rounded-[20px] bg-midIvory p-2">
                  {postInfo.imageUrl.map((img, idx) => (
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