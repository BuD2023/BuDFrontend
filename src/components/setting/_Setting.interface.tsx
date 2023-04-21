/** notification의 useState 타입  */
export interface NotificationType {
  [key: string]: boolean;
  all: boolean;
  follow: boolean;
  post: boolean;
}
