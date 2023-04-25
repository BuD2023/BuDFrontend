import { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { S3_URL } from '../../constant/union';
import { useGetUserLevelInfoQuery } from '../../store/module/useMyProfileQuery';
import { getMyPageInfo } from '../../store/recoil/user';
import LevelIconModal from '../common/LevelIconModal';

export default function LevelImgList() {
  const images = [];
  const [level, setLevel] = useState<string>();

  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  // // 사용자 정보
  // const getMyPageInfoLodable = useRecoilValueLoadable(getMyPageInfo);
  // const myPageInfo: any = 'hasValue' === getMyPageInfoLodable.state ? getMyPageInfoLodable.contents : {};

  const { data: levelData, refetch, isFetchedAfterMount } = useGetUserLevelInfoQuery();
  useEffect(() => {
    if (!isFetchedAfterMount) refetch();
  }, []);

  const handleClickImg = (level: string, url: string) => {
    setLevel(level);
    setIsPicPopUp({
      open: true,
      pic: url,
    });
  };

  return (
    <>
      <LevelIconModal level={level?.includes('L') ? level?.slice(0, -1) : level} isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <div className="grid grid-cols-2 place-items-center gap-4">
        {levelData?.map((url, i) => (
          <div key={`level-${i}`} className="rounded-xl bg-white bg-opacity-50">
            <img onClick={() => handleClickImg(String(i + 1), url)} className="dark:brightness-1 aspect-square cursor-pointer object-contain brightness-95" src={url} alt={`Level ${i}`} />
          </div>
        ))}
      </div>
    </>
  );
}
