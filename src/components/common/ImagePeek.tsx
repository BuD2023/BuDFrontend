import React from 'react';

interface ImagePeekPropsType {
  imgPeek: string[] | ArrayBuffer[] | null[];
  setIsPicPopUp: (x: { open: boolean; pic: string }) => void;
}

export default function ImagePeek({ imgPeek, setIsPicPopUp }: ImagePeekPropsType) {
  return (
    <>
      {imgPeek.length > 0 && (
        <div className="flex w-full shrink-0 items-center gap-2 overflow-x-auto rounded-[20px] bg-greyBeige p-2 dark:bg-sky">
          {imgPeek.map((img, idx) => (
            <img
              onClick={(e) => {
                e.stopPropagation();
                setIsPicPopUp({
                  open: true,
                  pic: img as string,
                });
              }}
              key={idx}
              src={img as string}
              className="pre-img h-[120px] w-[120px] shrink-0 cursor-pointer rounded-[20px] object-cover"
            />
          ))}
        </div>
      )}
    </>
  );
}