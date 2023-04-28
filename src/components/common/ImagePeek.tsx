import LazyLoadImage from '../../utils/LazyLoadImage';
import { ImagePeekPropsType } from './_Common.interface';

export default function ImagePeek({ imgPeek, setIsPicPopUp }: ImagePeekPropsType) {
  return (
    <>
      {imgPeek.length > 0 && (
        <div className="flex w-full items-center gap-2 overflow-x-auto rounded-[20px] px-2">
          {imgPeek.map((img, idx) => (
            <LazyLoadImage
              onClick={(e) => {
                e.stopPropagation();
                setIsPicPopUp({
                  open: true,
                  pic: img as string,
                });
              }}
              key={idx}
              src={img as string}
              alt={img as string}
              className="bg-greyBe h-[120px] w-[120px] shrink-0 cursor-pointer rounded-[20px]"
            ></LazyLoadImage>
          ))}
        </div>
      )}
    </>
  );
}
