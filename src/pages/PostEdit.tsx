import React, { useEffect } from 'react';
import Header from '../components/common/Header';
import { BsChevronLeft } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { RxTriangleDown } from 'react-icons/rx';
import { AiFillPicture } from 'react-icons/ai';
import PicModal from '../components/common/PicModal';
import imageCompression from 'browser-image-compression';
import { useParams } from 'react-router-dom';
import { useCommunityDetailQuery } from '../store/module/useCommunityDetailQuery';
import actionImgCompress from '../utils/imgCompress';

export default function PostEdit() {
  const { id: postId } = useParams();

  //게시글 타입
  const postTypes = ['개발 피드', 'Q & A 피드'];
  const [isClick, setIsClick] = useState(true);

  // 게시글 전체 정보
  const { data, isLoading, error } = useCommunityDetailQuery(Number(postId));
  const initialValue = { title: data?.title, content: data?.content, postType: data?.postType, images: data?.imageUrls as null[] | Blob[], postId: postId };
  const [postInfo, setPostInfo] = useState(initialValue);

  useEffect(() => {
    // if(!isLoading || !data) {
    //   return
    // }
    setPostInfo(initialValue);
  }, [data]);

  // 사진 미리보기
  const [imgPeek, setImgPeek] = useState<string[] | ArrayBuffer[] | null[]>([]);

  // 사진 업로드
  const imgRef = useRef<HTMLInputElement>(null);

  //사진 압축
  const makeCompressedImg = async (fileArr: FileList) => {
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;
    console.log(fileArr);

    const compressedFiles = await Promise.all(
      Array.from(fileArr)
        .slice(0, filesLength)
        .map(async (file) => {
          return await actionImgCompress(file);
        })
    );
    return compressedFiles;
  };

  //multipart form data로 저장
  // const makeMultipartForm = (compressedFiles: Blob[] | FileList) => {
  //   const formData = new FormData();
  //   for (let i = 0; i < compressedFiles.length; i++) {
  //     formData.append(`photos`, compressedFiles[i]);
  //   }
  //   return formData;
  // };

  const handleChangeProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = e.target.files as FileList;

    const compressedFiles = await makeCompressedImg(fileArr);
    console.log(compressedFiles);
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
    setImgPeek(compressedFileURLs);

    // const MultipartData = makeMultipartForm(compressedFiles as Blob[]);
    setPostInfo({
      ...postInfo,
      images: compressedFiles as Blob[],
    });
  };
  // form data 확인
  // if (postInfo.images !== null) {
  //   for (let key of (postInfo.images as FormData).keys()) {
  //     console.log(key);
  //   }
  //   for (let value of (postInfo.images as FormData).values()) {
  //     console.log(value);
  //   }
  // }

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
                <span className="grow text-[18px] font-semibold">{postInfo.postType === 'QNA' ? 'Q & A 피드' : '개발 피드'}</span>
                <RxTriangleDown className="text-[40px] opacity-50" />
              </button>
              <ul className={`w-full overflow-hidden rounded-[20px] bg-midIvory px-4 transition-all dark:bg-lightNavy ${isClick ? 'h-0' : 'h-[124px] py-2'}`}>
                <div className="scroll max-h-[45vh] overflow-auto">
                  {postTypes.map((postType) => (
                    <li key={postType} className="my-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPostInfo({ ...postInfo, postType: e.currentTarget.innerHTML === '개발 피드' ? 'FEED' : 'QNA' });
                          setIsClick(true);
                        }}
                        type="button"
                        className="text-start w-full p-1 px-4 hover:rounded-[20px] hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-[#506779] dark:hover:bg-opacity-50"
                      >
                        {postType}
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
                defaultValue={postInfo.title}
                type="text"
                placeholder="제목을 입력해주세요(필수)"
                className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 text-[16px] placeholder:font-semibold  placeholder:text-[#7b6d6d] placeholder:opacity-80 focus:outline-none dark:bg-lightNavy dark:placeholder:text-white"
              />
              <input ref={imgRef} type="file" accept="image/*" multiple onChange={handleChangeProfileImg} className="hidden" />
              <div onClick={() => imgRef?.current?.click()} className="flex h-[54px] w-[54px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-midIvory dark:bg-lightNavy">
                <AiFillPicture className="opacity-80" />
              </div>
            </div>
            <div className={`${!isClick ? 'h-[calc(100vh-470px)]' : 'h-[calc(100vh-346px)]'} flex w-full flex-col gap-2 transition-all`}>
              {imgPeek.length > 0 && (
                <div className="flex w-full shrink-0 items-center gap-2 overflow-auto rounded-[20px] bg-midIvory p-2">
                  {imgPeek.map((img, idx) => (
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
