import { z } from "zod";
import { createCustomerUseCase } from "~/server/core/usecase/createCustomerUseCase";

const createCustomerSchema = z.object({
  name: z.string(),
  corporate_number: z.string(),
  country: z.string().nullable(),
  invoices: z.array(z.object({ id: z.string(), start_date: z.date(), end_date: z.date().nullable() })),
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
