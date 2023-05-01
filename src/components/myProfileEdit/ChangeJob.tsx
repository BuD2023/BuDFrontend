import { useState } from 'react';
import { RxTriangleDown } from 'react-icons/rx';
import { JOB_LIST } from '../../constant/union';
import { ChangeJobPropsType } from './_MyProfileEdit.interface';

export default function ChangeJob({ selectedJob, setSelectedJob }: ChangeJobPropsType) {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-4 text-xl font-bold">
      <button onClick={() => setIsClick(!isClick)} type="button" className="text-start mb-6 flex h-[54px] w-full items-center rounded-[20px] bg-midIvory p-2 px-4 text-[21px] dark:bg-lightNavy">
        <span className="grow font-bold">{selectedJob.job}</span>
        <RxTriangleDown className="inline text-[#ffffff30]" />
      </button>
      <div className={`w-full overflow-hidden rounded-[20px] bg-midIvory px-4 transition-all dark:bg-lightNavy ${isClick ? 'h-full py-2' : 'h-0'}`}>
        <ul className="scroll max-h-[45vh] overflow-auto">
          {JOB_LIST.map((job) => (
            <li key={job} className="my-3">
              <button
                onClick={(e) => {
                  setSelectedJob({ ...selectedJob, job: e.currentTarget.innerText });
                  setIsClick(false);
                }}
                type="button"
                className="text-start w-[95%] p-2 px-4 text-[21px] font-bold hover:rounded-[20px] hover:bg-greyBeige hover:bg-opacity-50 dark:hover:bg-[#506779] dark:hover:bg-opacity-50"
              >
                {job}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
