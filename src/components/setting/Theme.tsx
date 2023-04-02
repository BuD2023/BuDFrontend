import { useState } from 'react';
import { MdBedtime, MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked, MdWbSunny } from 'react-icons/md';

export default function Theme() {
  const $html = document.querySelector('html');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const themeLight = 'light';
  const themeDark = 'dark';

  const handleTheme = (e: any) => {
    if (localStorage.getItem('theme') !== e.currentTarget.htmlFor) {
      localStorage.setItem('theme', e.currentTarget.htmlFor);
    }
    if (localStorage.getItem('theme') === themeLight) {
      setTheme('light');
      $html?.classList.add(themeLight);
      $html?.classList.remove(themeDark);
      localStorage.setItem('theme', themeLight);
    } else {
      setTheme('dark');
      $html?.classList.add(themeDark);
      $html?.classList.remove(themeLight);
      localStorage.setItem('theme', themeDark);
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-4 rounded-3xl bg-midIvory p-5 dark:bg-midNavy">
      <div className="flex items-center gap-3 text-[22px] font-semibold dark:border-[#ffffff50]">
        {theme === themeLight ? <MdWbSunny size="30" /> : <MdBedtime size="30" />}
        <p>테마 설정</p>
      </div>
      <ul className="flex flex-col text-xl">
        <li className="flex cursor-pointer p-2 hover:rounded-lg hover:bg-greyBeige hover:bg-opacity-50">
          <input type="radio" id="light" name="theme" className="cursor-pointer appearance-none" />
          <label onClick={handleTheme} htmlFor="light" className="flex grow cursor-pointer justify-between">
            <span>라이트 모드</span>
            {theme === themeLight ? <MdOutlineRadioButtonChecked color="#327559" size="22" /> : <MdOutlineRadioButtonUnchecked color="white" />}
          </label>
        </li>
        <li className="flex cursor-pointer p-2 hover:rounded-lg hover:bg-greyBeige hover:bg-opacity-50">
          <input type="radio" id="dark" name="theme" defaultChecked className="cursor-pointer appearance-none" />
          <label onClick={handleTheme} htmlFor="dark" className="flex grow cursor-pointer justify-between">
            <span>다크 모드</span>
            {theme === themeDark ? <MdOutlineRadioButtonChecked color="#327559" size="22" /> : <MdOutlineRadioButtonUnchecked color="white" />}
          </label>
        </li>
      </ul>
    </div>
  );
}
