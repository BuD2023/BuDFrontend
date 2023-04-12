import { useEffect, useState } from 'react';
import newsSrc from '../assets/newsSrc.jpeg';
import _ from 'lodash';
import Header from '../components/common/Header';
import { BsChevronLeft } from 'react-icons/bs';
import { useNewsDetailQuery } from '../store/module/useNewsQuery';
import { timeForToday } from '../store/commentDummy';

export default function NewsDetail() {
  const [isScroll, setIsScroll] = useState(false);
  const id = Number(location.pathname.replace('/newsDetail/', ''));
  const { data, isLoading, error } = useNewsDetailQuery(id);

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
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <section className="flex h-full min-h-screen flex-col items-start gap-4 py-4">
      {data !== undefined && (
        <>
          <Header type="news" icon={<BsChevronLeft />} copyUrl={data.link} />
          <div className="relative top-[34px] h-[70vh] w-full">
            <img src={data.mainImgUrl} className="h-full w-full" />
            <div className={`absolute ${isScroll ? 'top-0' : 'top-[50%]'} flex min-h-screen w-full justify-center transition-all duration-500`}>
              <div
                style={{ background: 'linear-gradient( to top, rgba(0,0,0,0.9), rgba(0,0,0,0.7), rgba(0,0,0,0.5), transparent )' }}
                className="absolute flex w-full flex-col items-center gap-3 bg-white p-8 text-[24px] font-semibold leading-8 "
              >
                <div onClick={() => window.open(data.link, '_blank')} dangerouslySetInnerHTML={{ __html: data.title }} className="cursor-pointer text-white"></div>
                <div className="flex w-full flex-col justify-between text-[13px] text-white opacity-60 ">
                  <div className="flex gap-3">
                    <div>{data.company}</div>
                    <div>{timeForToday(data.registeredAt)}</div>
                  </div>
                  <div>{data.journalistOriginalNames}</div>
                </div>
                <div className="absolute top-[calc(100%-1.5rem)] min-h-[70vh] w-full rounded-[40px] bg-lightIvory p-6 text-[15px] font-medium leading-7 dark:bg-darkNavy ">
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
