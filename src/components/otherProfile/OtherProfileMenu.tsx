import React from 'react';

interface IOtherProfileMenuPropsType {
  postView: boolean;
  setPostView: (x: boolean) => void;
}

export default function OtherProfileMenu({ postView, setPostView }: IOtherProfileMenuPropsType) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full items-center justify-around border border-lightIvory border-b-darkIvory border-opacity-20 font-semibold dark:border-darkNavy dark:border-b-lightNavy ">
        <div
          onClick={() => setPostView(true)}
          className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${
            postView ? 'border-b-lightText border-opacity-100 dark:border-b-white' : 'opacity-50'
          }  bg-none py-5 text-center`}
        >
          게시글
        </div>
        <div
          onClick={() => setPostView(false)}
          className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${
            !postView ? 'border-b-lightText border-opacity-100 dark:border-b-white' : 'opacity-50'
          }  bg-none py-5 text-center`}
        >
          {`Q	& A 피드`}
        </div>
      </div>
    </div>
  );
}
