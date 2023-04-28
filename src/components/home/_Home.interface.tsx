/** getGithubInfoAxios - 깃허브 정보를 가져올 때 사용하는 response 타입 */
export interface githubInfoType {
  readonly commits: {
    readonly commitDate: string;
    readonly commitCount: number;
  }[];
  readonly consecutiveCommitDays: number;
  readonly levelCode: string;
  readonly nickName: string;
  readonly remainCommitCountNextLevel: number;
  readonly thisWeekCommitCount: number;
  readonly todayCommitCount: number;
  readonly imagePath: string;
  readonly totalCommitCount: number;
}

/** HomeTitle - 홈 타이틀에 사용하는 props 타입 */
export interface HomeTitlePropsType {
  readonly nickName?: string;
  readonly isLoading?: boolean;
}

/** HomeLevelSection - 홈 레벨 섹션에 사용하는 props 타입 */
export interface HomeLevelSectionPropsType {
  readonly levelCode?: string;
  readonly remainCommitCountNextLevel?: number;
  readonly isLoading?: boolean;
  readonly levelImg?: string;
}

/** HomeCommitSection - 홈 커밋 섹션에 사용하는 props 타입 */
export interface HomeCommitSectionPropsType {
  readonly todayCommitCount?: number;
  readonly thisWeekCommitCount?: number;
  readonly consecutiveCommitDays?: number;
  readonly isLoading?: boolean;
}

/** HomeCommitCalendar - 홈 커밋 캘린더에 사용하는 props 타입 */
export interface HomeCommitCalendarPropsType {
  readonly commits?: {
    readonly commitDate?: string;
    readonly commitCount?: number;
  }[];
  readonly isLoading?: boolean;
}
