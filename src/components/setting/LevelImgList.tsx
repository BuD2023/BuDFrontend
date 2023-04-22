import { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { S3_URL } from '../../constant/union';
import { getMyPageInfo } from '../../store/recoil/user';
import LevelIconModal from '../common/LevelIconModal';

export default function LevelImgList() {
  const images = [];
  const [level, setLevel] = useState<string>();

  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  // 사용자 정보
  const getMyPageInfoLodable = useRecoilValueLoadable(getMyPageInfo);
  const myPageInfo: any = 'hasValue' === getMyPageInfoLodable.state ? getMyPageInfoLodable.contents : {};

  const handleClickImg = (level: string) => {
    setLevel(level);
    setIsPicPopUp({
      open: true,
      pic: `${S3_URL}levels/lv${level}.png`,
    });
  };

  for (let i = 1; i <= 10; i++) {
    const num = String(myPageInfo.level >= i ? i : i + 'L');
    images.push(
      <div key={`level-${i}`} className="rounded-xl bg-white bg-opacity-50">
        <img onClick={() => handleClickImg(num)} className="dark:brightness-1 aspect-square cursor-pointer object-contain brightness-95" src={`${S3_URL}levels/lv${num}.png`} alt={`Level ${i}`} />
      </div>
    );
  }

  return (
    <>
      <LevelIconModal level={level?.includes('L') ? level?.slice(0, -1) : level} isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      <div className="grid grid-cols-2 place-items-center gap-4">{images}</div>
    </>
  );
}
