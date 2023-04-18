import axios from 'axios';
import { useState, useEffect } from 'react';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import AddBtn from '../components/common/AddBtn';
import FooterMenu from '../components/common/FooterMenu';
import ScrollToTopBtn from '../components/common/ScrollToTopBtn';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');
  const [titleInfo, setTitleInfo] = useState({
    numberOfElements: 0,
    numberOfUsers: 0,
  });

  const getTitleInfo = (Elements: number, users: number) => {
    setTitleInfo({
      numberOfElements: Elements,
      numberOfUsers: users,
    });
  };

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative mb-20 mt-9 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4  p-4">
        <AddBtn url="/roomCreate" text="방만들기" />
        <CoffeeTitle inputValue={inputValue} setInputValue={setInputValue} titleInfo={titleInfo} />
        <CoffeeChatRoom inputValue={inputValue} getTitleInfo={getTitleInfo} />
      </div>
      <FooterMenu />
    </section>
  );
}
