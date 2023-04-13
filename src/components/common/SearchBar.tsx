import React, { useEffect, useRef } from 'react';
import { BsBackspace } from 'react-icons/bs';

interface ISearchBarPropsType {
  inputValue: string;
  setInputValue: (x: string) => void;
}

export default function SearchBar({ inputValue, setInputValue }: ISearchBarPropsType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const clearInputValue = () => {
    inputRef.current && (inputRef.current.value = '');
    setInputValue('');
  };

  return (
    <div className="relative flex w-full items-center">
      <input
        ref={inputRef}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          e.key === 'Enter' && setInputValue(e.currentTarget.value);
        }}
        type="text"
        placeholder="키워드로 검색"
        className="searchInput h-[60px] w-full rounded-xl bg-white p-4 text-xl font-bold text-[#514848] dark:bg-[#E4E4E4]"
      />
      {inputValue && <BsBackspace onClick={clearInputValue} className="absolute right-5 cursor-pointer" size={20} />}
    </div>
  );
}
