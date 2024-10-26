import { getUser } from "~/core/usecases/getUser";
import { userRepository } from "~/core/repositories/userRepository";
import { NotFoundError } from "@/core/errors";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id ?? "");
  if (Number.isNaN(id)) throw createError({ statusCode: 404, statusMessage: "User not found." });

  const result = await getUser(userRepository, id);

  if (result instanceof NotFoundError) {
    throw createError({ statusCode: result.errorCode, statusMessage: "User not found." });
  }

  return result;
});
