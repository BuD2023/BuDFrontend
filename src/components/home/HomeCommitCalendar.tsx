import { HomeCommitCalendarPropsType } from './_Home.interface';

export default function HomeCommitCalendar({ commits, isLoading }: HomeCommitCalendarPropsType) {
  const dateFormat = (today: Date) =>
    `${today.getFullYear()}-${today.getMonth() + 1 < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;

  function dateCalculator(date: Date, n: number) {
    return new Date(date.setDate(date.getDate() - n));
  }

  const values = commits;

  const resultArr = [] as string[];
  const calendarArr = Array.from({ length: 112 }, (v, i) => i)
    .map((date) => dateFormat(dateCalculator(new Date(), date)))
    .reverse();

  calendarArr.map((i) => {
    if (values?.map((value) => value.commitDate).includes(i)) {
      if (values?.find((value) => value.commitDate === i)?.commitCount === 0) resultArr.push('bg-[#534340]');
      if (values?.find((value) => value.commitDate === i)?.commitCount === 1) resultArr.push('bg-[#B4E197]');
      if (values?.find((value) => value.commitDate === i)?.commitCount === 2) resultArr.push('bg-[#9DC08B]');
      if (values?.find((value) => value.commitDate === i)?.commitCount === 3) resultArr.push('bg-[#4e944f]');
      if (values?.find((value) => value.commitDate === i) !== undefined && Number(values.find((value) => value.commitDate === i)?.commitCount) > 3) resultArr.push('bg-[#446a46]');
    } else {
      resultArr.push('bg-[#534340]');
    }
  });

  if (isLoading) {
    return <div className="dark:bg- relative mb-2 min-h-[260px] w-full rounded-[50px] bg-midIvory dark:bg-midNavy"></div>;
  }

  return (
    <div className="relative mb-2 flex min-h-[260px] w-full flex-col">
      <div className="absolute inset-0 flex flex-col justify-between gap-6 rounded-[50px] bg-midIvory p-10 text-lightText dark:bg-midNavy dark:text-white">
        <div className="text-[26px] font-bold">커밋 캘린더</div>
        <div className="flex h-[200px] w-full items-center justify-center">
          <div className="grid w-full grid-flow-col grid-rows-7 gap-1">
            {resultArr.map((backgroundColor, index) => (
              <div key={index} className={`h-4 rounded ${backgroundColor} `}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
