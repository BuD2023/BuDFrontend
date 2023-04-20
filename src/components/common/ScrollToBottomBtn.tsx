import { throttle } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { BiArrowToTop } from 'react-icons/bi';
import { ScrollToBottomBtnPropsType } from './_Common.interface';

export default function ScrollToBottomBtn({ scrollToNew }: ScrollToBottomBtnPropsType) {
  const [showBtn, setShowBtn] = useState(false);
  const handleShowButton = useMemo(
    () =>
      throttle(() => {
        const scrollY = (scrollToNew.current as HTMLDivElement).scrollTop;
        if (scrollY < -700) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }
      }, 250),
    []
  );

  useEffect(() => {
    (scrollToNew.current as HTMLDivElement)?.addEventListener('scroll', handleShowButton);
    return () => {
      (scrollToNew.current as HTMLDivElement)?.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <>
      {showBtn && (
        <div
          onClick={() =>
            (scrollToNew.current as HTMLDivElement).scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          className="fixed bottom-[100px] right-10 z-10 cursor-pointer rounded-full bg-white p-2 text-pointGreen drop-shadow-md transition-all"
        >
          <BiArrowToTop size={28} className="rotate-180" />
        </div>
      )}
    </>
  );
}
