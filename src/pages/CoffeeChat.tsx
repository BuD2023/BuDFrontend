import axios from 'axios';
import { useState, useEffect } from 'react';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import AddBtn from '../components/common/AddBtn';
import FooterMenu from '../components/common/FooterMenu';
import { chatRooms, IChatRoomType } from '../store/chatsDummy';
import { accessToken } from '../main';
import { useAllChatroomQuery, useSearchChatroomQuery } from '../store/module/useCoffeeChatQuery';
import { ChatroomType } from '../apiFetcher/coffeeChatInfo/getAllChatroomList';
import ScrollToTopBtn from '../components/common/ScrollToTopBtn';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');

  // reactQuery
  // const { isLoading: allLoading, data: allData, fetchNextPage: fetchAllNextPage, hasNextPage: allHasNextPage } = useAllChatroomQuery();
  // const { isLoading: searchLoading, data: searchData, fetchNextPage: fetchSearchNextPage, hasNextPage: searchHasNextPage } = useSearchChatroomQuery();

  return (
    <section>
      <ScrollToTopBtn />
      <div className="relative mb-20 mt-9 flex h-full min-h-[calc(100vh-160px)] w-full flex-col items-center gap-4  p-4">
        <AddBtn url="/roomCreate" text="방만들기" />
        <CoffeeTitle chatRooms={chatRooms} inputValue={inputValue} setInputValue={setInputValue} />
        <CoffeeChatRoom inputValue={inputValue} />
      </div>
      <FooterMenu />
    </section>
  );
}
