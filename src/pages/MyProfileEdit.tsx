import { useState, MouseEvent, useRef, ChangeEvent } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { RxTriangleDown } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import MainBtn from '../components/common/MainBtn';
import { jobList } from '../store/dummy';

export default function MyProfileEdit() {
  const [isClick, setIsClick] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [nickName, setNickName] = useState('');
  const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(defaultImg);
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onChangeNickname = (e: any) => {
    setNickName(e.target.value);
  };

  const onClickJob = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedJob(e.currentTarget.innerText);
    setIsClick(false);
  };

  const handleProfileImgClick = () => {
    imgRef?.current?.click();
  };

  const handleChangeProfileImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImg(reader.result);
      };
    }
  };

  const handleDeletePreviewFile = (e: MouseEvent) => {
    e.preventDefault();
    if (imgRef.current) {
      setProfileImg(defaultImg);
    }
  };

  return (
    <section>
      <div className="mt-16 flex flex-col gap-7 p-4  ">
        <div className="fixed left-0 top-0 z-10 w-full border-b-[0.5px] border-b-black border-opacity-20 bg-lightIvory pb-4 text-2xl dark:bg-darkNavy">
          <div className="mt-16 flex items-center px-4">
            <div className="shrink-0 grow basis-[0]">
              <BsChevronLeft onClick={() => navigate('/myProfile')} className="cursor-pointer" />
            </div>
            <h1 className="flex grow basis-[0] items-center gap-2 text-[26px] font-bold">프로필 수정</h1>
            <div className="ml-12 cursor-pointer">
              <MainBtn content={'완료'} size={20} />
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-7 p-4">
          <div className="profile_img m-auto mt-4 h-[200px] w-[200px]">
            <input ref={imgRef} type="file" accept="image/*" onChange={handleChangeProfileImg} className="hidden" />
            {profileImg && <img src={profileImg.toString()} className="pre-img absolute h-[200px] w-[200px] cursor-pointer rounded-[100px] object-cover" onClick={handleProfileImgClick} />}
          </div>
          <button className="flex items-center justify-center text-sm transition-all disabled:opacity-0" disabled={profileImg === defaultImg} onClick={handleDeletePreviewFile}>
            <p className="h-10 rounded-lg bg-greyBeige p-[0.25rem_0.75rem] text-[16px] font-semibold leading-8 transition-all hover:bg-darkIvory hover:text-white dark:bg-lightNavy hover:dark:bg-[#3D6374]">
              기본 이미지로 변경
            </p>
          </button>
          <div className="mb-4 flex flex-col gap-4 text-xl font-bold">
            <p className="font-bold">닉네임</p>
            <input onChange={onChangeNickname} type="text" value="JHni2" className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 focus:outline-none dark:bg-lightNavy"></input>
          </div>
          <div className="flex flex-col gap-4 text-xl font-bold">
            <p className="font-bold">직무</p>
            <div className="flex w-full flex-col items-center">
              <button
                onClick={() => setIsClick(!isClick)}
                type="button"
                className="mb-6 flex h-[54px] w-full items-center rounded-[20px] bg-midIvory p-2 px-4 text-start text-[21px] dark:bg-lightNavy"
              >
                <span className="grow font-bold">{selectedJob.length > 0 ? selectedJob : '프론트엔드개발'}</span>
                <RxTriangleDown className="inline text-[#ffffff30]" />
              </button>
              <ul className={`w-full overflow-hidden rounded-[20px] bg-midIvory p-2 px-4 transition-all dark:bg-lightNavy ${isClick ? '' : 'pointer-events-none opacity-0'}`}>
                <div className="scroll max-h-[45vh] overflow-auto">
                  {jobList.map((job) => (
                    <li key={job} className="my-3">
                      <button onClick={(e) => onClickJob(e)} type="button" className="w-[95%] p-2 px-4 text-start text-[21px] font-bold hover:rounded-[20px] hover:bg-[#506779]">
                        {job}
                      </button>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
