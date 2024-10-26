import type { User as PrismaUser } from "@prisma/client";
import { type User, userSchema } from "@/core/entities/user";
import type { IUserRepository } from "@/core/repositories/userRepository";
import { ValidationError } from "@/core/errors";

export const createUser = async (
  userRepository: IUserRepository,
  userData: User,
): Promise<PrismaUser | ValidationError> => {
  const validateResult = userSchema.safeParse(userData);

  if (!validateResult.success) {
    validateResult.error.issues;
    return new ValidationError(validateResult.error.issues);
  }

  if (await userRepository.isEmailDuplicate(userData.email)) {
    return new ValidationError([{ path: ["email"], message: "Email already exists" }]);
  }

  return await userRepository.create(validateResult.data);
};
