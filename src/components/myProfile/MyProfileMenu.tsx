interface IMyProfileMenuPropsType {
  postView: string;
  setPostView: React.Dispatch<React.SetStateAction<string>>;
}

export default function MyProfileMenu({ postView, setPostView }: IMyProfileMenuPropsType) {
  return (
    <div className="flex w-full items-center justify-around border border-lightIvory border-b-darkIvory border-opacity-20 font-semibold dark:border-darkNavy dark:border-b-lightNavy ">
      <div
        onClick={() => setPostView('feed')}
        className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${
          postView === 'feed' ? 'border-b-lightText border-opacity-100 dark:border-b-white' : 'opacity-50'
        }  bg-none py-5 text-center`}
      >
        개발 피드
      </div>
      <div
        onClick={() => setPostView('qna')}
        className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${
          postView === 'qna' ? 'border-b-lightText border-opacity-100 dark:border-b-white' : 'opacity-50'
        }  bg-none py-5 text-center`}
      >
        {`Q	& A 피드`}
      </div>
      <div
        onClick={() => setPostView('scrap')}
        className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${
          postView === 'scrap' ? 'border-b-lightText border-opacity-100 dark:border-b-white' : 'opacity-50'
        }  bg-none py-5 text-center`}
      >
        스크랩
      </div>
    </div>
  );
}
