import type { ValidationIssue } from "~/server/core/errors";

/**
 * ValidationIssueオブジェクトの型ガード。
 */
export const isValidationIssue = (arg: unknown): arg is ValidationIssue => {
  return (
    typeof arg === "object" && // オブジェクト
    arg !== null && // nullではない
    "message" in arg && // "message" propertyを持つ
    typeof arg.message === "string" && // "message" はstring
    "path" in arg && // "path" propertyを持つ
    Array.isArray(arg.path) && // "path" は配列
    arg.path.every((v) => typeof v === "string" || typeof v === "number") // "path" の中身はstringかnumber
  );
};

/**
 * バックエンドからエラーレスポンスとして受け取ったValidationIssueに型をつける。
 */
export const isValidationIssues = (arg: unknown): arg is ValidationIssue[] => {
  return Array.isArray(arg) && arg.every((v) => isValidationIssue(v));
};

/**
 * ValidationIssueをフラットにした型。
 * Zodのflattenを参考にしているがオブジェクトのIssueをプロパティごとに分けている点が異なる。
 */
export type FlatValidationIssues = {
  formErrors: string[];
  fieldErrors: {
    [key: string]: string[];
  };
};

/**
 * ValidationIssueをFlatValidationIssuesに変換する関数。
 */
export const parseValidationIssues = (issues: ValidationIssue[]): FlatValidationIssues => {
  const errorMap: FlatValidationIssues = {
    formErrors: [],
    fieldErrors: {},
  };

  issues.forEach((issue) => {
    if (issue.path.length === 0) {
      errorMap.formErrors = errorMap.formErrors.concat(issue.message);
      return;
    }

    const path = issue.path.join(".");
    if (path in errorMap) {
      errorMap.fieldErrors[path] = errorMap.fieldErrors[path].concat(issue.message);
    } else {
      errorMap.fieldErrors[path] = [issue.message];
    }
  });
  return errorMap;
};
