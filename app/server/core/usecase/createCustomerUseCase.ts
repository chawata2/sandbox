import {createCustomer, type CreateCustomerPayload} from "~/server/core/domain/customer";
//import {prisma} from "~/server/core/interfaces/prismaClient";

type CreateCustomerUseCasePayload = Omit<CreateCustomerPayload, "id" | "code" | "code_num">;

/**
 * 取引先を作成するユースケース。
 *
 * @param payload
 * @returns
 */
export const createCustomerUseCase = async (payload: CreateCustomerUseCasePayload) => {
	return payload
	//const currentMaxCodeNum =
	//  (await prisma.customer.findFirst({ select: { code_num: true }, orderBy: { code_num: "desc" } }))?.code_num ?? 0;
	//
	//const currentMaxId =
	//  (await prisma.customer.findFirst({ select: { id: true }, orderBy: { id: "desc" } }))?.id ?? BigInt(0);
	//
	//const nextCodeNum = currentMaxCodeNum + 1;
	//const nextId = currentMaxId + BigInt(1);
	//
	//const newCustomer = createCustomer({
	//  id: nextId,
	//  code_num: nextCodeNum,
	//  name: payload.name,
	//  corporate_number: payload.corporate_number,
	//  country: null,
	//  invoices: [],
	//});
	//
	//const { invoices, ...customer } = newCustomer;
	//
	//return await prisma.$transaction([
	//  prisma.customer.create({
	//    data: customer,
	//  }),
	//  ...invoices.map((invoice) => prisma.invoice.create({ data: invoice })),
	//]);
};
