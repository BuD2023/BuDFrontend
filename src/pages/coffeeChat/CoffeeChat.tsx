import { useState } from 'react';
import CoffeeChatRoom from '../../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../../components/coffeeChat/CoffeeTitle';
import AddBtn from '../../components/common/AddBtn';
import FooterMenu from '../../components/common/FooterMenu';
import ScrollToTopBtn from '../../components/common/ScrollToTopBtn';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative mb-20 mt-9 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4 p-4">
        <AddBtn url="/roomCreate" text="방만들기" />
        <CoffeeTitle inputValue={inputValue} setInputValue={setInputValue} />
        <CoffeeChatRoom inputValue={inputValue} />
      </div>
      <FooterMenu />
    </section>
  );
}
