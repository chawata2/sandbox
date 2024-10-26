import { createCustomer, type CreateCustomerPayload } from "~/server/core/domain/customer";
import { prisma } from "~/server/core/interfaces/prismaClient";

type CreateCustomerUseCasePayload = Omit<CreateCustomerPayload, "id" | "code" | "code_num">;

/**
 * 取引先を作成するユースケース。
 *
 * @param payload
 * @returns
 */
export const createCustomerUseCase = async (payload: CreateCustomerUseCasePayload) => {
  const currentMaxCodeNum = await prisma.customer.findFirstOrThrow({ orderBy: { code_num: "desc" } });
  const currentMaxId = await prisma.customer.findFirstOrThrow({ orderBy: { id: "desc" } });

  const nextCodeNum = currentMaxCodeNum.code_num + 1;
  const nextId = currentMaxId.id + 1n;

  const newCustomer = createCustomer({
    id: nextId,
    code_num: nextCodeNum,
    name: payload.name,
    corporate_number: payload.corporate_number,
    country: null,
    invoices: [],
  });

  const { invoices, ...customer } = newCustomer;

  return await prisma.$transaction([
    prisma.customer.create({
      data: customer,
    }),
    ...invoices.map((invoice) => prisma.invoice.create({ data: invoice })),
  ]);
};
