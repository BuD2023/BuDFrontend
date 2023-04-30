import LazyLoadImage from '../../utils/LazyLoadImage';
import { ImagePeekPropsType } from './_Common.interface';

export default function ImagePeek({ imgPeek, setIsPicPopUp }: ImagePeekPropsType) {
  return (
    <>
      {imgPeek?.length > 0 && (
        <div className="flex h-[135px] w-full shrink-0 items-center gap-2 overflow-x-auto overflow-y-hidden rounded-[20px] px-2">
          {imgPeek?.map((img, idx) => (
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
              className="aspect-square h-full max-h-[120px] shrink-0 cursor-pointer rounded-[20px] bg-greyBeige object-cover p-2"
            />
          ))}
        </div>
      )}
    </>
  );
}
