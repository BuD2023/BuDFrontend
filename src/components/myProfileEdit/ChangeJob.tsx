import React, { useState } from 'react';
import { RxTriangleDown } from 'react-icons/rx';
import { jobList } from '../../store/dummy';

interface IChangeJobPropsType {
  selectedJob: string;
  setSelectedJob: (x: string) => void;
}

export default function ChangeJob({ selectedJob, setSelectedJob }: IChangeJobPropsType) {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-4 text-xl font-bold">
      <button onClick={() => setIsClick(!isClick)} type="button" className="mb-6 flex h-[54px] w-full items-center rounded-[20px] bg-midIvory p-2 px-4 text-start text-[21px] dark:bg-lightNavy">
        <span className="grow font-bold">{selectedJob}</span>
        <RxTriangleDown className="inline text-[#ffffff30]" />
      </button>
      <ul className={`w-full overflow-hidden rounded-[20px] bg-midIvory p-2 px-4 transition-all dark:bg-lightNavy ${isClick ? '' : 'pointer-events-none opacity-0'}`}>
        <div className="scroll max-h-[45vh] overflow-auto">
          {jobList.map((job) => (
            <li key={job} className="my-3">
              <button
                onClick={(e) => {
                  setSelectedJob(e.currentTarget.innerText);
                  setIsClick(false);
                }}
                type="button"
                className="w-[95%] p-2 px-4 text-start text-[21px] font-bold hover:rounded-[20px] hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-[#506779] dark:hover:bg-opacity-50"
              >
                {job}
              </button>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
