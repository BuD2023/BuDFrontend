import React, { useEffect, useRef, useState } from 'react';
import { BsBackspace } from 'react-icons/bs';
import { MdKeyboardVoice } from 'react-icons/md';
import useSpeechRecognition from '../../utils/useSpeechRecognition';
import { ISearchBarPropsType } from './_Common.interface';

export default function SearchBar({ inputValue, setInputValue }: ISearchBarPropsType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const clearInputValue = () => {
    inputRef.current && (inputRef.current.value = '');
    setInputValue('');
    setTmpValue('');
    setText('');
  };

  //음성인식
  const { text, setText, startListening, stopListening, isListening, hasRecognitionSupport } = useSpeechRecognition();
  const [tmpValue, setTmpValue] = useState('');
  useEffect(() => {
    setTmpValue(inputValue);
  }, [inputValue]);
  const voiceRecHandler = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  if (text && text.length > 0) {
    setInputValue(text);
  }

  return (
    <>
      <div className="relative flex w-full items-center">
        <input
          ref={inputRef}
          onChange={(e) => {
            setTmpValue(e.target.value);
            if (e.target.value.length < 1) {
              setInputValue('');
              setTmpValue('');
              setText('');
            }
          }}
          value={text ? text : tmpValue}
          contentEditable
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              if (text && text.length > 0) setInputValue(text);
              else setInputValue(tmpValue);
            }
          }}
          onFocus={() => {
            if (text) {
              setTmpValue(text);
              setText('');
            } else return;
          }}
          type="text"
          // placeholder={text ? text : filterKeywords && filterKeywords.length > 0 ? filterKeywords : '키워드로 검색'}
          placeholder={'키워드로 검색'}
          className="searchInput h-[60px] w-full rounded-xl bg-white p-4 text-xl font-bold text-[#514848] dark:bg-[#E4E4E4]"
        />
        {inputValue && <BsBackspace onClick={clearInputValue} className="absolute right-5 cursor-pointer" size={20} />}
        {hasRecognitionSupport && !inputValue && <MdKeyboardVoice onClick={voiceRecHandler} className="absolute right-3 cursor-pointer" size={28} color={isListening ? '#b91c1c' : '#2F4658'} />}
      </div>
      {isListening && <div className="w-full text-center text-sm">음성 인식중입니다. 검색 키워드를 얘기해주세요🎤</div>}
    </>
  );
}
