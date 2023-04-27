/** notification의 useState 타입  */
export interface NotificationType {
  readonly [key: string]: boolean;
  readonly all: boolean;
  readonly follow: boolean;
  readonly post: boolean;
}
