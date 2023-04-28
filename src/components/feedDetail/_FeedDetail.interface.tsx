/** CommunityCommentForm - 커뮤니티 댓글 폼에 사용하는 props 타입 */
export interface CommunityFeedCommentFormPropsType {
  readonly type: string;
  readonly answerId?: number;
  readonly questionUserId?: number;
  readonly commentCount?: number;
  readonly refetch?: any;
}
