import { ChangeEvent, useRef, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxTriangleDown } from 'react-icons/rx';
import { motion } from 'framer-motion';

export function Nickname() {
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();

  const onChangeNickname = (e: any) => {
    setNickName(e.target.value);
  };

  return (
    <motion.div initial={{ opacity: 0, y: '7%' }} animate={{ opacity: 1, y: '0' }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col items-center gap-8 p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-[26px] font-bold">마리포에서 사용할</h1>
          <h1 className="text-[26px] font-bold">닉네임을 알려주세요!</h1>
        </div>
        <input
          onChange={onChangeNickname}
          type="text"
          placeholder="닉네임을 적어주세요"
          className="h-[54px] w-full rounded-[20px] bg-lightNavy p-2 px-4 text-[21px] font-bold focus:outline-none"
        ></input>
        <button
          type="button"
          onClick={() => navigate('picture')}
          disabled={!(nickName.length > 0)}
          className="w-20 rounded-md border border-lightNavy py-2 text-sm transition-all hover:bg-lightNavy disabled:opacity-0"
        >
          다음
        </button>
      </div>
    </motion.div>
  );
}

export function Picture() {
  const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(defaultImg);
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
    <motion.div initial={{ opacity: 0, y: '5%' }} animate={{ opacity: 1, y: '0' }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col items-center gap-8 p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-[26px] font-bold">마리포에서 사용할</h1>
          <h1 className="text-[26px] font-bold">사진을 선택해주세요!</h1>
        </div>
        <div className="profile_img m-auto h-[200px] w-[200px]">
          <input ref={imgRef} type="file" accept="image/*" onChange={handleChangeProfileImg} className="hidden" />
          {profileImg && <img src={profileImg.toString()} className="pre-img absolute h-[200px] w-[200px] cursor-pointer rounded-[100px] object-cover" onClick={handleProfileImgClick} />}
        </div>
        <button className="flex items-center text-sm transition-all disabled:opacity-0" disabled={profileImg === defaultImg} onClick={handleDeletePreviewFile}>
          <p className="h-10 rounded-lg bg-lightNavy p-[0.25rem_0.75rem] text-sm leading-8 transition-all hover:bg-[#3D6374]">기본 이미지로 변경</p>
        </button>
        <div className="flex gap-4">
          <button onClick={() => navigate('/signUp')} type="button" className="className= w-20 rounded-md border border-lightNavy py-2 transition-all hover:bg-lightNavy disabled:opacity-0">
            이전
          </button>
          <button onClick={() => navigate('/signUp/job')} type="button" className="className= w-20 rounded-md border border-lightNavy py-2 transition-all hover:bg-lightNavy disabled:opacity-0">
            다음
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Job() {
  const jobList = [
    '게임',
    '네트워크·서버·보안',
    '프론트엔드개발',
    '모바일웹개발',
    '빅데이터·AI(인공지능)',
    '벡앤드개발',
    '소프트웨어·하드웨어',
    '시스템프로그래머',
    '응용프로그래머',
    'HTML·퍼블리싱·UI개발',
  ];
  const [isClick, setIsClick] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const navigate = useNavigate();

  const onClickJob = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedJob(e.currentTarget.innerText);
    setIsClick(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: '5%' }} animate={{ opacity: 1, y: '0' }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col items-center gap-8 p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-[26px] font-bold">관심있는 직무를</h1>
          <h1 className="text-[26px] font-bold">선택해주세요!</h1>
        </div>
        <div className="flex w-full flex-col items-center">
          <button onClick={() => setIsClick(!isClick)} type="button" className="mb-6 flex h-[54px] w-full  items-center rounded-[20px] bg-lightNavy p-2 px-4 text-start text-[21px]">
            <span className={`grow ${selectedJob.length > 0 ? '' : 'text-[#ffffff30]'}`}>{selectedJob.length > 0 ? selectedJob : '직무를 선택해주세요'}</span>
            <RxTriangleDown className="inline text-[#ffffff30]" />
          </button>
          <ul className={`w-full overflow-hidden rounded-[20px] bg-lightNavy p-2 px-4 transition-all ${isClick ? '' : 'pointer-events-none opacity-0'}`}>
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
        <div className="flex gap-4">
          <button onClick={() => navigate('/signUp/picture')} type="button" className="className= w-20 rounded-md border border-lightNavy py-2 transition-all hover:bg-lightNavy disabled:opacity-0">
            이전
          </button>
          <button disabled={!(selectedJob.length > 0)} type="button" className="className= w-20 rounded-md border border-lightNavy py-2 transition-all hover:bg-lightNavy disabled:opacity-0">
            완료
          </button>
        </div>
      </div>
    </motion.div>
  );
}
