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
}

export interface HomeTitleProps {
  nickName: string;
}

export interface HomeLevelSectionProps {
  levelCode: string;
  remainCommitCountNextLevel: number;
}

export interface HomeCommitSectionProps {
  todayCommitCount: number;
  thisWeekCommitCount: number;
  consecutiveCommitDays: number;
}

export interface HomeCommitCalendarProps {
  commits: {
    commitDate: string;
    commitCount: number;
  }[];
}
