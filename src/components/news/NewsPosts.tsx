import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { NewsPostsProps } from './_News.interface';
import { timeForToday } from '../../store/commentDummy';

export default function NewsPosts({ newsData }: NewsPostsProps) {
  const navigate = useNavigate();

  async function compressUrlImage(url: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 800,
      };
      const compressedBlob = await imageCompression(blob as File, options);
      const compressedFile = new File([compressedBlob], 'compressed.jpg', { type: compressedBlob.type });
      return URL.createObjectURL(compressedFile);
    } catch (error) {
      console.log(error);
      return url;
    }
  }

  // const newsDataResult = newsData.map(async (data) => ({ ...data, img: await compressUrlImage(data.img) }));

  return (
    <ul>
      {newsData.map((data) => (
        <li onClick={() => navigate(`/newsDetail/${data.id}`)} key={data.id} className="mb-4 flex h-[115px] cursor-pointer items-center gap-1 rounded-[20px] bg-midIvory dark:bg-midNavy">
          <div className="shrink-0">
            <img src={data.mainImgUrl} alt={data.title} className="h-[115px] w-[115px] rounded-[20px] object-cover" />
          </div>
          <div className="w-full overflow-hidden pl-3 pr-5">
            <h1 dangerouslySetInnerHTML={{ __html: data.title }} className="mb-2 truncate text-base font-bold"></h1>
            <p dangerouslySetInnerHTML={{ __html: data.summaryContent }} className="ellipsis mb-3 text-[13px] leading-4"></p>
            <div className="flex justify-between">
              <p className="text-xs opacity-50">조회수 {data.hitCount}</p>
              <p className="text-xs opacity-50">{timeForToday(data.registeredAt)}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
