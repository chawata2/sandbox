import type { Prisma } from "@prisma/client";
import type { IUserRepository } from "@/core/repositories/userRepository";
import { NotFoundError } from "@/core/errors";

export const getUser = async (
  userRepository: IUserRepository,
  userID: number,
): Promise<Prisma.UserGetPayload<{ include: { posts: true } }> | NotFoundError> => {
  const user = await userRepository.getByID(userID);

  if (user == null) {
    return new NotFoundError();
  }

  return user;
};
