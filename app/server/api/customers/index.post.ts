import { z } from "zod";
import { createCustomerUseCase } from "~/server/core/usecase/createCustomerUseCase";

const createCustomerSchema = z.object({
  name: z.string(),
  corporateNumber: z.string(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) => createCustomerSchema.safeParse(body));

  if (result.success === false) {
    return createError({
      statusCode: 422,
      message: "バリデーションに失敗しました。",
      data: {
        errors: result.error.format(),
      },
    });
  }

  return createCustomerUseCase(result.data);
});
