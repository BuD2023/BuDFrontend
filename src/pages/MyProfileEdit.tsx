import { useState, ChangeEvent } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import Header from '../components/common/Header';
import ChangeIntroduction from '../components/myProfileEdit/ChangeIntroduction';
import ChangeJob from '../components/myProfileEdit/ChangeJob';
import ChangeNickName from '../components/myProfileEdit/ChangeNickName';
import ChangeProfilePic from '../components/myProfileEdit/ChangeProfilePic';

export default function MyProfileEdit() {
  const [selectedJob, setSelectedJob] = useState('프론트엔드 개발');
  const [nickName, setNickName] = useState('JHni2');
  const [introduction, setIntroduction] = useState('안녕하세요!');
  const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(defaultImg);
  const editProfileData = { profileImg: profileImg, nickName: nickName, introduction: introduction, selectedJob: selectedJob };

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

  return (
    <section>
      <div className="flex min-h-[calc(100vh-160px)] flex-col gap-7 py-4 px-6 text-lightText dark:text-white">
        <Header type="withMainBtn" title="프로필 편집" icon={<BsChevronLeft />} onSubmit={editProfileData} />
        <div className="mt-9 flex h-full flex-col gap-7 p-4 px-2 text-xl font-bold">
          <ChangeProfilePic profileImg={profileImg} handleChangeProfileImg={handleChangeProfileImg} setProfileImg={setProfileImg} />
          <div className="mb-4 flex flex-col gap-4">
            <p>닉네임</p>
            <ChangeNickName nickName={nickName} setNickName={setNickName} />
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <p>소개</p>
            <ChangeIntroduction introduction={introduction} setIntroduction={setIntroduction} />
          </div>
          <div className="flex flex-col gap-4">
            <p>직무</p>
            <ChangeJob selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
          </div>
        </div>
      </div>
    </section>
  );
}
