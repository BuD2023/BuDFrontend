import React from 'react';

interface ISearchBarPropsType {
  inputValue: string;
  setInputValue: (x: string) => void;
}

export default function SearchBar({ inputValue, setInputValue }: ISearchBarPropsType) {
  return (
    <div className="w-full">
      <input
        value={inputValue}
        onChange={(e) => {
          e.preventDefault();
          setInputValue(e.target.value);
        }}
        type="text"
        placeholder="키워드로 검색"
        className="searchInput h-[60px] w-full rounded-xl bg-white p-4 text-xl font-bold text-[#514848] dark:bg-[#E4E4E4]"
      />
    </div>
  );
}
