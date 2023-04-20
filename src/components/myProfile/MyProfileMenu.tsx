import { useNavigate } from 'react-router-dom';
import { MyProfileMenuPropsType } from './_MyProfile.interface';

export default function MyProfileMenu({ postView, setPostView }: MyProfileMenuPropsType) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-around border border-lightIvory border-b-darkIvory border-opacity-20 font-semibold dark:border-darkNavy dark:border-b-lightNavy ">
      <div
        onClick={() => {
          setPostView('feed');
          navigate('/myProfile/feed');
        }}
        className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${
          postView === 'feed' ? 'border-b-lightText border-opacity-100 dark:border-b-white' : 'opacity-50'
        }  bg-none py-5 text-center`}
      >
        개발 피드
      </div>
      <div
        onClick={() => {
          setPostView('qna');
          navigate('/myProfile/qna');
        }}
        className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${
          postView === 'qna' ? 'border-b-lightText border-opacity-100 dark:border-b-white' : 'opacity-50'
        }  bg-none py-5 text-center`}
      >
        {`Q	& A 피드`}
      </div>
      <div
        onClick={() => {
          setPostView('scrap');
          navigate('/myProfile/scrap');
        }}
        className={`w-[110px] cursor-pointer border border-lightIvory dark:border-darkNavy ${
          postView === 'scrap' ? 'border-b-lightText border-opacity-100 dark:border-b-white' : 'opacity-50'
        }  bg-none py-5 text-center`}
      >
        스크랩
      </div>
    </div>
  );
}
