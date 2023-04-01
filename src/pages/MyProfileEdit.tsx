import { useState, MouseEvent, useRef, ChangeEvent } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { RxTriangleDown } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import MainBtn from '../components/common/MainBtn';
import ChangeJob from '../components/myProfileEdit/ChangeJob';
import ChangeNickName from '../components/myProfileEdit/ChangeNickName';
import ChangeProfilePic from '../components/myProfileEdit/ChangeProfilePic';
import MyProfileEditHeader from '../components/myProfileEdit/MyProfileEditHeader';
import { jobList } from '../store/dummy';

export default function MyProfileEdit() {
  const [selectedJob, setSelectedJob] = useState('프론트엔드 개발');
  const [nickName, setNickName] = useState('JHni2');
  const defaultImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [profileImg, setProfileImg] = useState<string | ArrayBuffer | null>(defaultImg);

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
      <div className="mt-16 flex flex-col gap-7 p-4  ">
        <MyProfileEditHeader />
        <div className="mt-16 flex flex-col gap-7 p-4">
          <ChangeProfilePic profileImg={profileImg} handleChangeProfileImg={handleChangeProfileImg} setProfileImg={setProfileImg} />
          <ChangeNickName nickName={nickName} setNickName={setNickName} />
          <ChangeJob selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
        </div>
      </div>
    </section>
  );
}
