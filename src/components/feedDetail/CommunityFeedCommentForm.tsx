import { BsArrowReturnRight, BsDot, BsFillPinAngleFill, BsHeartFill, BsThreeDots } from 'react-icons/bs';
import { commentArr, commentDummyType, timeForToday } from '../../store/commentDummy';

export default function CommunityFeedCommentForm() {
  console.log(timeForToday('2023 02 02 14:31:10'));

  const getCommentResult = (arr: commentDummyType[]) => {
    arr.sort((a, b) => Number(a.createdAt.trim().split(':').join('').split(' ').join('')) - Number(b.createdAt.trim().split(':').join('').split(' ').join('')));
    const pinned = arr.find((i) => i.isPinned === true);
    const originalComment = arr.filter((i) => i.isRef === false && i.isPinned === false);
    let secondaryComment = arr
      .filter((i) => i.isRef === true)
      .sort((a, b) => Number(a.createdAt.trim().split(':').join('').split(' ').join('')) - Number(b.createdAt.trim().split(':').join('').split(' ').join('')));
    let resultArr = [] as commentDummyType[];
    pinned && resultArr.push(pinned);
    originalComment.length > 0 &&
      originalComment.map((i) => {
        resultArr.push(i);
        secondaryComment.map((j) => {
          if (j.refId === i.id) resultArr.push(j);
        });
      });
    return resultArr;
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-[20px] bg-midIvory dark:bg-midNavy">
      <div className="flex h-[55px] w-full items-center border border-lightIvory border-b-darkIvory p-5 text-[20px] font-bold dark:border-darkNavy dark:border-b-lightNavy">
        <div>댓글</div>
        <div className="ml-2 text-[18px] font-bold opacity-50">4개</div>
      </div>
      <ul className="flex w-full flex-col gap-4 p-4">
        {getCommentResult(commentArr).map((comment) => (
          <li key={comment.id} className="flex min-h-[60px] w-full gap-2">
            {comment.isRef && <BsArrowReturnRight className="ml-4 text-[20px]" />}
            <img src={comment.profileImage} className="h-[50px] w-[50px] shrink-0 rounded-full object-cover" />
            <div className="flex h-full w-full flex-col justify-between gap-1">
              <div className="flex w-full justify-between">
                <div className="flex items-center gap-1">
                  <div className="text-[15px] font-semibold">{comment.displayName}</div>
                  <BsDot className="opacity-70" />
                  <div className="mr-2 text-[14px] opacity-70">{timeForToday(comment.createdAt)}</div>
                  {comment.isPinned && (
                    <div className="itmes-center flex justify-center gap-1 rounded-2xl bg-greyBeige px-[5px] py-1 text-[14px] dark:bg-sky">
                      <BsFillPinAngleFill />
                      고정됨
                    </div>
                  )}
                </div>
                <BsThreeDots className="cursor-pointer" />
              </div>
              <div className="flex justify-between">
                <div className="text-[15px]">{comment.content}</div>
                <div className="flex items-center justify-center gap-1">
                  {comment.isLiked ? <BsHeartFill className="cursor-pointer text-[#f44336]" /> : <BsHeartFill className="cursor-pointer text-white" />}
                  <span className="text-[13px]">{comment.likeCount}</span>
                </div>
              </div>
              {!comment.isRef && <div className="text-[14px] opacity-60">답글 달기</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
