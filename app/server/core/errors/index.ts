export class BaseError extends Error {
  constructor(
    readonly errorCode: number,
    message?: string,
  ) {
    super(message);
  }
}

export type ValidationIssue = {
  path: (string | number)[];
  message: string;
};

/**
 * バリデーションエラーで使用するエラー。
 */
export class ValidationError extends BaseError {
  constructor(readonly issues: ValidationIssue[]) {
    super(422, "Validation error.");
  }
}

/**
 * Get系のユースケースでデータが見つからない場合に返すエラー。
 */
export class NotFoundError extends BaseError {
  constructor() {
    super(404, "Not Found.");
  }
}
