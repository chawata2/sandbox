export type InvalidParameter = {
  path: (string | number)[];
  reason: string;
};

/**
 * バリデーションエラーで使用するエラー。
 */
export class ValidationError extends Error {
  constructor(readonly invalidParams: InvalidParameter[]) {
    super("Validation error.");
  }
}

/**
 * Get系のユースケースでデータが見つからない場合に返すエラー。
 */
export class NotFoundError extends Error {
  constructor() {
    super("Not Found.");
  }
}
