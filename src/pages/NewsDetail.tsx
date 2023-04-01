import { useEffect, useState } from 'react';
import { AiFillCopy } from 'react-icons/ai';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import newsSrc from '../assets/newsSrc.jpeg';
import _ from 'lodash';

export default function NewsDetail() {
  const navigate = useNavigate();

  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const scroll = _.throttle(function () {
      console.log(window.scrollY);
      if (window.scrollY > 5) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return (
    <section>
      <div className="flex h-full min-h-screen flex-col items-start gap-4 py-4">
        <div className="mt-8 flex w-full cursor-pointer justify-between px-4 text-[24px]">
          <MdOutlineKeyboardArrowLeft onClick={() => navigate('/news')} />
          <AiFillCopy />
        </div>
        <div className="relative h-[70vh] w-full">
          <img src={newsSrc} className="h-full w-full rounded-[30px] object-cover" />
          <div className={`absolute ${isScroll ? 'top-0' : 'top-[65%]'} flex min-h-screen w-full justify-center transition-all duration-500`}>
            <div
              style={{ background: 'linear-gradient( to top, rgba(0,0,0,0.9), rgba(0,0,0,0.7), rgba(0,0,0,0.5), transparent )' }}
              className="absolute flex w-full flex-col items-center gap-3 bg-white p-8 text-[24px] font-semibold leading-8 "
            >
              <div className="text-white">인프랩-멋쟁이사자처럼, 손잡고 IT 교육 생태계 확장</div>
              <div className="flex w-full items-center justify-between text-[13px] text-white opacity-60 ">
                <div className="flex items-center gap-3">
                  <div>디지털데일리</div>
                  <div>2023.03.30. 오후 3:30</div>
                </div>
                <div>이종현 기자</div>
              </div>
              <div className="absolute top-[calc(100%-1.5rem)] min-h-[70vh] w-full rounded-[40px] bg-lightIvory p-6 text-[15px] font-medium leading-7 dark:bg-darkNavy ">
                <div>
                  {`[디지털데일리 이종현기자] 정보기술(IT) 교육 플랫폼 ‘인프런’을 운영하는 인프랩이 프로그래밍 교육 브랜드 멋쟁이사자처럼(이하 멋사)와 업무협약을 체결했다고 30일 밝혔다.
양사는 이번 업무협약을 통해 멋사에서 운영하는 부트캠프, 해커톤 등 IT 교육 과정을 인프런으로도 확장할 수 있도록 연계한다는 계획이다. 또 추후 온·오프라인 IT 교육 과정을 함께 기획 및 운영하며 콘퍼런스, IT 채용 박람회 등 행사 개최에도 함께한다.
이형주 인프랩 대표는 “오랜 기간 좋은 교육 커뮤니티를 만들어온 멋사와 함께 하게 돼 기쁘다. 긴밀한 협업을 통해 성장하고 싶은 사람들에게 좋은 영향을 미칠 수 있도록 노력하겠다”고 말했다.
이두희 멋사 대표는 “멋사와 인프랩의 적극적인 교육과정 연계를 통해 수강생들이 개발자의 꿈을 이뤄나갈 수 있도록 긴밀하게 협력하겠다. 이번 교육 기업 간의 협력으로 ‘교육 대협업의 시대’를 만들고 싶다”고 전했다.
이종현(bell@ddaily.co.kr)
기자 프로필`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
