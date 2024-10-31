import { z } from "zod";
import { createCustomerUseCase } from "~/server/core/usecase/createCustomerUseCase";
import { createValidationError } from "~/server/utils/error";

const createCustomerSchema = z.object({
  name: z.string(),
  corporate_number: z.string(),
  country: z.string().nullable(),
  invoices: z.array(z.object({ id: z.string(), start_date: z.date(), end_date: z.date().nullable() })),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) => createCustomerSchema.safeParse(body));

  console.log("this");
  if (result.success === false) {
    console.log(result.error.errors);
    throw createValidationError(result.error.errors.map((error) => ({ path: error.path, reason: error.message })));
  }

  return createCustomerUseCase(result.data);
});
