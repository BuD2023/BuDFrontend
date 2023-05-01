import LazyLoadImage from '../../utils/LazyLoadImage';
import { ImagePeekPropsType } from './_Common.interface';

export default function ImagePeek({ imgPeek, setIsPicPopUp }: ImagePeekPropsType) {
  return (
    <>
      {imgPeek && imgPeek?.length > 0 && (
        <div className="noScrollBar flex h-[135px] w-full shrink-0 items-center gap-2 overflow-x-auto overflow-y-hidden rounded-[20px] bg-midIvory px-2 dark:bg-midNavy">
          {imgPeek &&
            imgPeek?.map((img, idx) => (
              <LazyLoadImage
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPicPopUp({
                    open: true,
                    pic: String(img),
                  });
                }}
                key={idx}
                src={String(img)}
                alt={'미리보기 이미지'}
                className="aspect-square h-full max-h-[120px] shrink-0 cursor-pointer rounded-[20px] object-cover "
              />
            ))}
        </div>
      )}
    </>
  );
}
