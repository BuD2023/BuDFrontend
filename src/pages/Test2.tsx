import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useEffect } from 'react';

type Passenger = {
  _id: string;
  name: string;
  trips: number;
  airline: {
    country: string;
    name: string;
  };
};

type PassengersResponse = {
  data: Passenger[];
  totalPages: number;
  totalPassengers: number;
};

const PAGE_SIZE = 10;

const fetchData = ({ pageParam = 0 }) => {
  return axios.get(`https://api.instantwebtools.net/v1/passenger?page=${pageParam}&size=${PAGE_SIZE}`);
};

export default function Test2() {
  const { isLoading, isError, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(['passengers'], fetchData, {
    getNextPageParam: (prevData, allPages) => {
      const maxPages = prevData.data.totalPages;
      const nextPage = allPages.length + 1;
      return nextPage < maxPages ? nextPage : undefined;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <h2>Loading...!!</h2>;
  if (isError) return <h2>Error fetching data</h2>;

  return (
    <>
      <div>
        {data?.pages.map((group, index) => (
          <div key={index}>
            {group.data.data.map((passenger: Passenger) => (
              <div key={passenger._id}>{passenger.name}</div>
            ))}
          </div>
        ))}
      </div>
      <div ref={ref} />
    </>
  );
}
