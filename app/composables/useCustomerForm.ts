import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export type CustomerForm = {
  name: string;
  corporate_number: string;
  invoices: {
    start_date: string;
    end_date: string | null;
  }[];
};

export const useCustomerForm = (initialValues: CustomerForm) => {
  const schema = toTypedSchema(
    z.object({
      name: z.string().min(1),
      corporate_number: z.string().length(13),
      invoices: z
        .array(
          z.object({
            start_date: z.string(),
            end_date: z.string().nullable(),
          }),
        )
        .superRefine((arr, ctx) => {
          arr.forEach((value, idx) => {
            if (idx === 0) return;
            ctx.addIssue({
              code: "custom",
              message: "テストバリデーション",
              path: [idx, "start_date"],
            });
          });
        }),
    }),
  );

  const { errors, defineField, handleSubmit } = useForm({ validationSchema: schema, initialValues });
  const [name] = defineField("name");
  const [corporateNumber] = defineField("corporate_number");
  const {
    remove: removeInvoice,
    push: pushInvoice,
    fields: invoices,
  } = useFieldArray<{ start_date: string | null; end_date: string | null }>("invoices");

  return {
    name,
    corporateNumber,
    invoices,
    errors,
    handleSubmit,
    removeInvoice,
    pushInvoice,
  };
};
