import { useEffect, useState } from 'react';
import _ from 'lodash';
import Header from '../../components/common/Header';
import { BsChevronLeft } from 'react-icons/bs';
import { useNewsDetailQuery } from '../../store/module/useNewsQuery';
import PicModal from '../../components/common/PicModal';
import newsDefaultImg from '../../assets/newsDefaultImg.webp';
import { useNavigate } from 'react-router-dom';
import { timeForToday } from '../../utils/timeForToday';
import ScrollToTopBtn from '../../components/common/ScrollToTopBtn';

export default function NewsDetail() {
  const [isScroll, setIsScroll] = useState(false);
  const id = Number(location.pathname.replace('/newsDetail/', ''));
  const { data, isLoading, error } = useNewsDetailQuery(id);
  const navigate = useNavigate();

  // 사진 popUp
  const [isPicPopUp, setIsPicPopUp] = useState({
    open: false,
    pic: '',
  });

  const handleTitleClick = (e: React.MouseEvent<HTMLElement>) => {
    window.open(data?.link, '_blank');
    e.stopPropagation();
  };

  useEffect(() => {
    const scroll = _.throttle(function () {
      // console.log(window.scrollY);
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

  if (isLoading) {
    return (
      <section className="relative h-full">
        <div className="h-[calc(74px-1.5rem)]"></div>
        <div className="h-[70vh] bg-greyBeige dark:bg-sky"></div>
        <div className="absolute bottom-0 h-[44.5vh] w-full rounded-[40px] bg-lightIvory dark:bg-darkNavy"></div>
      </section>
    );
  }

  if (error) {
    navigate('/NotFound');
  }

  return (
    <section className="flex h-full min-h-screen flex-col items-center gap-4 py-4">
      <ScrollToTopBtn bottom="bottom-[50px]" />
      <PicModal isPicPopUp={isPicPopUp} setIsPicPopUp={setIsPicPopUp} />
      {data !== undefined && (
        <>
          <Header type="news" icon={<BsChevronLeft />} copyUrl={data.link} />
          <div className="relative top-[34px] h-[70vh] w-full">
            <img
              onClick={(e) => {
                setIsPicPopUp({
                  open: true,
                  pic: e.currentTarget.src,
                });
              }}
              src={data.mainImgUrl.length > 0 ? data.mainImgUrl : newsDefaultImg}
              alt={data.mainImgUrl}
              className="h-full w-full cursor-pointer object-cover"
            />
            <div className={`absolute ${isScroll ? 'top-0' : 'top-[50%]'} flex min-h-screen w-full cursor-pointer justify-center transition-all duration-500`}>
              <div
                onClick={() => {
                  setIsPicPopUp({
                    open: true,
                    pic: data.mainImgUrl.length > 0 ? data.mainImgUrl : newsDefaultImg,
                  });
                }}
                style={{ background: 'linear-gradient( to top, rgba(0,0,0,0.9), rgba(0,0,0,0.7), rgba(0,0,0,0.5), transparent )' }}
                className="absolute flex w-full flex-col items-center gap-3 bg-white p-8 text-[24px] font-semibold leading-8 "
              >
                <div onClick={handleTitleClick} dangerouslySetInnerHTML={{ __html: data.title }} className="z-40 text-white"></div>
                <div className="flex w-full flex-col justify-between text-[13px] text-white opacity-60 ">
                  <div className="flex gap-3">
                    <div>{data.company}</div>
                    <div>{timeForToday(data.registeredAt)}</div>
                  </div>
                  <div>{data.journalistOriginalNames}</div>
                </div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-[calc(100%-1.5rem)] min-h-[70vh] w-full cursor-default rounded-[40px] bg-lightIvory p-6 text-[15px] font-medium leading-7 dark:bg-darkNavy "
                >
                  <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
