export interface githubProps {
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

export interface HomeTitleProps {
  nickName?: string;
  isLoading?: boolean;
}

export interface HomeLevelSectionProps {
  levelCode?: string;
  remainCommitCountNextLevel?: number;
  isLoading?: boolean;
  levelImg?: string;
}

export interface HomeCommitSectionProps {
  todayCommitCount?: number;
  thisWeekCommitCount?: number;
  consecutiveCommitDays?: number;
  isLoading?: boolean;
}

export interface HomeCommitCalendarProps {
  commits?: {
    commitDate?: string;
    commitCount?: number;
  }[];
  isLoading?: boolean;
}
