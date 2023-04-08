import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import FooterMenu from '../components/common/FooterMenu';
import usePassengerMutation, { createDataType } from '../store/testUseMutation';
import usePassengerQuery, { responseDataType, responseType } from '../store/testUseQuery';

export default function Test() {
  const [info, setInfo] = useState({
    name: '',
    trips: 0,
    airline: 0,
  } as createDataType);
  const handleAddNewPost = () => {
    mutate(info);
  };

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData(['passengerInfo']);

  //useQuery
  const { isLoading, data: passengerData, fetchNextPage, hasNextPage } = usePassengerQuery();
  console.log(passengerData);

  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } = e?.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;
        console.log(hasNextPage);
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  //useMutation
  const { mutate, isLoading: isAdding } = usePassengerMutation();

  if (isLoading) {
    return <div className="w-full text-center text-[20px] font-semibold">...isLoading</div>;
  }

  return (
    <>
      <div className="relative mt-8 flex min-h-[calc(100vh-160px)] w-full flex-col gap-6 overflow-x-hidden bg-lightIvory p-4 text-lightText dark:bg-darkNavy dark:text-white ">
        <div>
          <label>name</label>
          <input value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} /> <br />
        </div>
        <div>
          <label>trip</label>
          <input type="number" value={info.trips} onChange={(e) => setInfo({ ...info, trips: Number(e.target.value) })} />
        </div>
        <div>
          <label>airline</label>
          <input type="number" value={info.airline} onChange={(e) => setInfo({ ...info, airline: Number(e.target.value) })} />
        </div>
        {isAdding && <div>....Adding New Post</div>}
        <button
          onClick={() => {
            handleAddNewPost();
          }}
          className="mb-3 rounded-xl bg-midIvory p-4 text-[20px] font-semibold"
        >
          Add new post
        </button>
        <div>
          {passengerData?.pages
            .map((i) => i.data)
            .flat()
            .map((item: responseDataType) => (
              <div key={item._id} className="mb-4 flex w-full flex-col justify-center rounded-2xl border border-black p-4">
                <h1 className="mb-1 text-[20px] font-semibold">{item.name}</h1>
                <span>{item.country}</span>
                <img src={item.logo} className="w-[50%]" />
              </div>
            ))}
        </div>
      </div>
      <FooterMenu />
    </>
  );
}
