export default function MyProfileInfo() {
  return (
    <div className="mt-3 flex h-[185px] w-full flex-col rounded-2xl bg-[#3D6374] text-white">
      <div className="flex h-[130px] w-full items-center justify-around px-3">
        <div className="flex flex-col items-center justify-around text-[22px] font-bold">
          <div>2</div>
          <div className="mt-2 text-[18px] font-medium">게시물</div>
        </div>
        <div className="flex flex-col items-center justify-around text-[22px] font-bold">
          <div>3</div>
          <div className="mt-2 text-[18px] font-medium">팔로워</div>
        </div>
        <div className="flex flex-col items-center justify-around text-[22px] font-bold">
          <div>5</div>
          <div className="mt-2 text-[18px] font-medium">팔로우</div>
        </div>
        <div className="flex flex-col items-center justify-around text-[22px] font-bold">
          <div>1</div>
          <div className="mt-2 text-[18px] font-medium">성장레벨</div>
        </div>
      </div>
      <div className="flex h-[55px] w-full text-[18px] font-semibold">
        <button className="h-full w-full rounded-2xl bg-lightNavy">프로필 편집</button>
      </div>
    </div>
  );
}
