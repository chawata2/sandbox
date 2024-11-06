import type { InvalidParameter } from "~/server/core/errors";
import { createError } from "h3";

export const createValidationError = (invalidParams: InvalidParameter[]) => {
  return createError({
    statusCode: 422,
    statusMessage: "Validation Error.",
    message: "バリデーションに失敗しました。",
    data: {
      invalidParams,
    },
  });
};
