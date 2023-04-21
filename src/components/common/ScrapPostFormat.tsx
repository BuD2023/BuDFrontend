import { FcPortraitMode } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import DefaultProfileImage from '../../assets/DefaultProfileImage.webp';

import { useState } from 'react';

import LikeCommentScrap from './LikeCommentScrap';
import ImagePeek from './ImagePeek';
import PicModal from './PicModal';
import { S3_URL } from '../../constant/union';
import { ScrapPostFormatPropsType } from './_Common.interface';
import { timeForToday } from '../../utils/timeForToday';

export default function ScrapPostFormat({ resultData }: ScrapPostFormatPropsType) {
  const navigate = useNavigate();

  //사진 팝업모달
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  return (
    <>
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      {/* <ul className="w-full">
        {resultData.length > 0 ? (
          resultData.map((data, idx) => (
            <li
              onClick={(e) => {
                e.preventDefault();
                if (data.post.postType === 'QNA') {
                  navigate(`/communityQADetail/${data.post.id}`);
                } else {
                  navigate(`/communityFeedDetail/${data.post.id}`);
                }
              }}
              key={idx}
              className="mb-6 flex cursor-pointer flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy"
            >
              <div className="flex w-full flex-col gap-4 p-4 text-lightText dark:text-white">
                <div className="flex w-full">
                  <div className="flex gap-1">
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/otherProfile/${data.post.member.id}/feed`);
                      }}
                      src={data.post.member.profileImg ? data.post.member.profileImg : DefaultProfileImage}
                      alt={data.post.title}
                      className="w-[58px] rounded-full"
                    />
                    <div className="pl-3">
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/otherProfile/${data.post.member.id}/feed`);
                        }}
                        className="text-xl font-bold"
                      >
                        {data.post.member.username}
                      </p>
                      <p className="text-[17px] opacity-50">{timeForToday(data.post.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-end grow font-bold">
                    <div className="flex h-full items-center justify-end gap-3">
                      <FcPortraitMode />
                      <p>팔로우</p>
                    </div>
                  </div>
                </div>
                <div className="flex text-[16px] font-semibold">
                  <div className="rounded-[30px] bg-greyBeige px-3 py-2 text-[14px] dark:bg-sky">{`${data.post.postType === 'FEED' ? '개발 피드' : 'Q & A 피드'}`}</div>
                </div>
                <div className="w-full">
                  <h1 className="mb-6 text-lg font-bold">{data.post.title}</h1>
                  <p className="text-base">{data.post.content}</p>
                </div>
              </div>
              {data.post.imageUrls.length > 0 && data.post.imageUrls[0] !== null && <ImagePeek setIsPicPopUp={setIsPicPopUp} imgPeek={data.post.imageUrls.map((imgeUrl) => S3_URL + imgeUrl)} />}
              <LikeCommentScrap postType={data.post.postType} likeCount={data.post.likeCount} commentCount={data.post.commentCount} postId={data.post.id} />
            </li>
          ))
        ) : (
          <div className="mb-6 flex h-[298px] flex-col items-center justify-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
            <div className="flex h-[200px] w-full items-center justify-center p-4 text-base font-semibold text-lightText dark:text-white">스크랩된 게시글이 없습니다.</div>
          </div>
        )}
      </ul> */}
    </>
  );
}
