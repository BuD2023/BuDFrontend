export interface CommentContentType {
  commentId: number;
  content: string;
  createdAt: string;
  isPinned: boolean;
  isReader: boolean;
  isReaderLiked: boolean;
  memberId: number;
  memberName: string;
  memberProfileUrl: string | null;
  numberOfLikes: number;
}

export interface CommunityCommentType {
  content: CommentContentType[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}
