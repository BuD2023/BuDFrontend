import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import postIsIdUniqueAxios from '../../apiFetcher/userInfo/postIsIdUnique';
import getIsIdUniqueAxios from '../../apiFetcher/userInfo/postIsIdUnique';
import Header from '../../components/common/Header';
import ChangeJob from '../../components/myProfileEdit/ChangeJob';
import ChangeNickName from '../../components/myProfileEdit/ChangeNickName';
import ChangeProfilePic from '../../components/myProfileEdit/ChangeProfilePic';
import { S3_URL } from '../../constant/union';
import { accessToken } from '../../main';
import { useGetIsIdUniqueQuery, useMyProfileQuery } from '../../store/module/useMyProfileQuery';
import { UserInfoInitialValueType } from '../../store/recoil/addUserInfo';
import { debounce, isFunction } from 'lodash';

export interface UserInfoEditInitialType {
  job: string;
  file: string;
  nickname: string;
  introduceMessage: string;
  isUnique: boolean;
}

export default function MyProfileEdit() {
  //useRef
  const inputRef = useRef<HTMLInputElement>(null);

  //리액트 쿼리
  const [nicknameData, setNicknameData] = useState('');
  const { data, isLoading, refetch } = useMyProfileQuery(false);
  const { data: isUniqueId, isLoading: isChecking, refetch: isUniqueRefetch } = useGetIsIdUniqueQuery(nicknameData);
  const validation = String(data?.nickName) === String(inputRef.current?.value) ? true : isUniqueId;

  //useStates
  const [validate, setValidate] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string | Blob | ArrayBuffer | null>(S3_URL + (data?.profileUrl as string));
  const [userInfo, setUserInfo] = useState<UserInfoEditInitialType>({
    job: data?.job,
    file: data?.profileUrl,
    nickname: data?.nickName,
    introduceMessage: data?.description,
    isUnique: validation as boolean,
  } as UserInfoEditInitialType);
  console.log(userInfo);

  useEffect(() => {
    isUniqueRefetch();
    setUserInfo({
      ...userInfo,
      isUnique: validation as boolean,
    } as UserInfoEditInitialType);
  }, [userInfo.nickname]);

  useEffect(() => {
    (async () => {
      refetch();
      setUserInfo({
        job: data?.job,
        file: data?.profileUrl,
        nickname: data?.nickName,
        introduceMessage: data?.description,
        isUnique: validation as boolean,
      } as UserInfoEditInitialType);
      setProfileImg(S3_URL + (data?.profileUrl as string));
    })();
  }, [isLoading]);

  return (
    <section className="flex min-h-[calc(100vh-160px)] flex-col gap-7 px-6 py-4 text-lightText dark:text-white">
      <Header type="withMainBtn" title="프로필 편집" icon={<BsChevronLeft />} onSubmit={userInfo} />
      <div className="mt-9 flex h-full flex-col gap-7 p-4 px-2 text-xl font-bold">
        <ChangeProfilePic profileImg={profileImg} setProfileImg={setProfileImg} userInfo={userInfo} setUserInfo={setUserInfo as (x: UserInfoInitialValueType | UserInfoEditInitialType) => void} />
        <div className="mb-4 flex flex-col gap-4">
          <p>닉네임</p>
          <input
            ref={inputRef}
            onChange={debounce(async (e) => {
              setNicknameData(e.target.value);
              setUserInfo({ ...userInfo, nickname: e.target.value });
            }, 300)}
            onFocus={() => setValidate(true)}
            onBlur={() => setValidate(false)}
            type="text"
            defaultValue={userInfo.nickname}
            className="h-[54px] w-full rounded-[20px] bg-midIvory p-2 px-4 focus:outline-none dark:bg-lightNavy"
          />
          {validation ? (
            <>{validate && userInfo.nickname && (userInfo?.nickname as string).length > 0 && <div className="mt-[-10px] ml-4 text-[16px] font-medium text-pointGreen">사용 가능한 닉네임입니다</div>}</>
          ) : (
            <>
              {validate && userInfo.nickname && (userInfo?.nickname as string).length > 0 && (
                <div className="mt-[-10px] ml-4 text-[16px] font-medium text-[#dc2214]">{'이미 사용중인 유저가 있습니다'}</div>
              )}
            </>
          )}
        </div>
        <div className="mb-4 flex flex-col gap-4">
          <p>소개</p>
          <textarea
            onChange={(e) => setUserInfo({ ...userInfo, introduceMessage: e.target.value })}
            value={userInfo.introduceMessage}
            placeholder="소개를 입력하세요"
            className="h-[120px] w-full rounded-[20px] bg-midIvory p-4 text-[16px] leading-5 placeholder:font-semibold placeholder:text-[#7b6d6d] focus:outline-none dark:bg-lightNavy"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>직무</p>
          <ChangeJob selectedJob={userInfo as UserInfoEditInitialType} setSelectedJob={setUserInfo as (x: UserInfoInitialValueType | UserInfoEditInitialType) => void} />
        </div>
      </div>
    </section>
  );
}
