import React from 'react';

interface ImagePeekPropsType {
  imgPeek: string[];
  setIsPicPopUp: (x: { open: boolean; pic: string }) => void;
}

export default function ImagePeek({ imgPeek, setIsPicPopUp }: ImagePeekPropsType) {
  return (
    <>
      {imgPeek.length > 0 && (
        <div className="flex w-full shrink-0 items-center gap-2 overflow-auto rounded-[20px] bg-midIvory p-2">
          {imgPeek.map((img, idx) => (
            <img
              onClick={() => {
                setIsPicPopUp({
                  open: true,
                  pic: img as string,
                });
              }}
              key={idx}
              src={img as string}
              className="pre-img h-[120px] w-[120px] cursor-pointer rounded-[20px] object-cover"
            />
          ))}
        </div>
      )}
    </>
  );
}
