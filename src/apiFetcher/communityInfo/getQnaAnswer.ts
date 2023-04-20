import customAxios from '../customAxios';

type qnaAnswerStatus = 'ACTIVE' | 'INACTIVE';

interface qnaAnswerSortType {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface MemberLevelType {
  createdAt: string;
  updatedAt: string;
  id: number;
  levelNumber: number;
  levelCode: string;
  levelStartCommitCount: number;
  nextLevelStartCommitCount: number;
  imagePath: string;
  blankImagePath: null;
}

interface QnaAnswerContentMemberType {
  createdAt: string;
  updatedAt: string;
  id: number;
  userId: string;
  level: MemberLevelType;
  nickName: string;
  profileImg: null | string;
  job: null | string;
  status: string;
  introduceMessage: null | string;
  addInfoYn: boolean;
  enabled: boolean;
  username: string;
  password: null;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: {
    authority: string;
  }[];
  oauthAccessToken: string;
  credentialsNonExpired: false;
}
export interface qnaAnswerContentType {
  id: number;
  member: QnaAnswerContentMemberType;
  content: string;
  commentCount: number;
  likeCount: number;
  qnaAnswerStatus: qnaAnswerStatus;
  createdAt: string;
  updatedAt: string;
  qnaAnswerPin: boolean;
}

interface qnaAnswerPageableType {
  sort: qnaAnswerSortType;
  offset: number;
  pageNumber: Number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface QnaAnswerType {
  content: qnaAnswerContentType[];
  pageable: qnaAnswerPageableType;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: qnaAnswerSortType;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export const getQnaAnswerAxios = async (token: string, postId: number): Promise<QnaAnswerType> => {
  return await customAxios({
    method: 'get',
    url: `/posts/qna-answers?postId=${postId}&page=0`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      charset: 'utf-8',
    },
  });
};
