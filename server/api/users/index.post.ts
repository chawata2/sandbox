import { createUser } from "~/core/usecases/createUser";
import { userRepository } from "~/core/repositories/userRepository";
import { ValidationError } from "@/core/errors";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await createUser(userRepository, body);

  if (result instanceof ValidationError) {
    throw createError({
      statusCode: result.errorCode,
      data: { validationIssues: result.issues },
      statusMessage: result.message,
    });
  }

  return result;
});
