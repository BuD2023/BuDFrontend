import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CoffeeChatRoom from '../components/coffeeChat/CoffeeChatRoom';
import CoffeeTitle from '../components/coffeeChat/CoffeeTitle';
import AddBtn from '../components/common/AddBtn';
import FooterMenu from '../components/common/FooterMenu';
import { chatRooms } from '../store/chatsDummy';
import { accessToken } from '../main';

export default function CoffeeChat() {
  const [inputValue, setInputValue] = useState('');

  const getChatRooms = async ({ pageParam = 0 }) => {
    try {
      const response = await axios.get(`api/chatrooms?page=${pageParam}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const searchChatRoomsResult = async () => {
    try {
      const response = await axios.get(`api/chatrooms/search?keyword=${inputValue}&page=0`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading, isError, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(['chatRooms'], getChatRooms, {
    getNextPageParam: (prevData, allPages) => {
      const lastPage = prevData.last;
      const nextPage = allPages.length;
      return lastPage ? undefined : nextPage + 1;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (inputValue) {
      searchChatRoomsResult();
    } else {
      getChatRooms({ pageParam: 0 });
    }
  }, [inputValue]);

  if (isLoading) return <h2>Loading...!!</h2>;
  if (isError) return <h2>Error fetching data</h2>;

  return (
    <section>
      <div className="relative mb-20 mt-9  flex  h-full  min-h-[calc(100vh-160px)]  w-full  flex-col  items-center  justify-center  gap-4  p-4">
        <AddBtn url="/roomCreate" text="방만들기" />
        <CoffeeTitle chatRooms={chatRooms} inputValue={inputValue} setInputValue={setInputValue} />
        <CoffeeChatRoom chatRooms={data.pages.flatMap((page) => page.content)} />
      </div>
      <div ref={ref} />
      <FooterMenu />
    </section>
  );
}
