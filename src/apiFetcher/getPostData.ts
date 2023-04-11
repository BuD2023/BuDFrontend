import axios from 'axios';
import { passengerDataType, responseType } from '../store/testUseQuery';

// interface responseType {
//   _id: string;
//   name: string;
//   country: string;
//   logo: string;
// }

export const getPostData = async (page: number): Promise<responseType> => {
  let passengerList = {
    totalPages: 0,
    totalPassengers: 0,
    data: [],
  } as responseType;
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.instantwebtools.net/v1/passenger?page=${page}&size=5`,
    });
    console.log(response.data);
    passengerList = {
      totalPages: response.data.totalPages,
      totalPassengers: response.data.totalPassengers,
      data: [
        ...response.data.data.map((i: passengerDataType) => ({
          _id: i._id,
          name: i.name,
          logo: i.airline[0].logo,
          country: i.airline[0].country,
        })),
      ],
    };
    return passengerList;
  } catch (error) {
    console.log(error);
    return passengerList;
  }
};
