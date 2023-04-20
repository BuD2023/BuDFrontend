/** getGithubInfoAxios - 깃허브 정보를 가져올 때 사용하는 response 타입 */
export interface githubInfoType {
  commits: {
    commitDate: string;
    commitCount: number;
  }[];
  consecutiveCommitDays: number;
  levelCode: string;
  nickName: string;
  remainCommitCountNextLevel: number;
  thisWeekCommitCount: number;
  todayCommitCount: number;
  imagePath: string;
}

/** HomeTitle - 홈 타이틀에 사용하는 props 타입 */
export interface HomeTitlePropsType {
  nickName?: string;
  isLoading?: boolean;
}

/** HomeLevelSection - 홈 레벨 섹션에 사용하는 props 타입 */
export interface HomeLevelSectionPropsType {
  levelCode?: string;
  remainCommitCountNextLevel?: number;
  isLoading?: boolean;
  levelImg?: string;
}

/** HomeCommitSection - 홈 커밋 섹션에 사용하는 props 타입 */
export interface HomeCommitSectionPropsType {
  todayCommitCount?: number;
  thisWeekCommitCount?: number;
  consecutiveCommitDays?: number;
  isLoading?: boolean;
}

/** HomeCommitCalendar - 홈 커밋 캘린더에 사용하는 props 타입 */
export interface HomeCommitCalendarPropsType {
  commits?: {
    commitDate?: string;
    commitCount?: number;
  }[];
  isLoading?: boolean;
}
