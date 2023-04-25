import { throttle } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BiArrowToTop } from 'react-icons/bi';

export default function ScrollToTopBtn() {
  const [showBtn, setShowBtn] = useState(false);
  const beforeScrollY = useRef(0);

  const handleShowButton = useMemo(
    () =>
      throttle(() => {
        if (window.scrollY > 700) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }
      }, 250),
    [beforeScrollY]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <>
      {showBtn && (
        <div
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          className="fixed bottom-[120px] right-8 z-10 cursor-pointer rounded-full bg-white p-2 text-pointGreen drop-shadow-md transition-all dark:text-sky"
        >
          <BiArrowToTop size={28} />
        </div>
      )}
    </>
  );
}
