export default function HomeLevelSection() {
  return (
    <div className="relative flex min-h-[236px] w-full flex-col">
      <div className="absolute inset-0 flex flex-col justify-between rounded-[50px] bg-midNavy p-10 pb-6 text-white">
        <div className="flex w-full justify-between">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <div className="text-[26px] font-bold">행복한 새싹</div>
              <div className="mt-5 text-[20px]">새싹</div>
            </div>
            <div className="text-[100px]">🌱</div>
          </div>
        </div>
        <div className="my-2 flex justify-center text-[18px] font-bold">
          <span>
            🥜 다음 성장까지 <span className="text-[22px] text-[#4DCE8F]">15커밋 </span>
            남았어요!
          </span>
        </div>
      </div>
    </div>
  );
}
