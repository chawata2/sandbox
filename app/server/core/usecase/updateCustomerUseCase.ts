import {updateCustomer, type Customer} from "~/server/core/domain/customer";
//import { prisma } from "~/server/core/interfaces/prismaClient";

type PartiallyPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type UpdateCustomerUseCasePayload = PartiallyPartial<Customer, "id">;

/**
 * 取引先を更新するユースケース。
 *
 * @param payload
 * @returns
 */
export const updateCustomerUseCase = async (payload: UpdateCustomerUseCasePayload) => {
	return payload
	//const currentCustomer = await prisma.customer.findFirstOrThrow({
	//  where: { id: payload.id },
	//  include: { invoices: true },
	//});
	//
	//const updatedCustomer = updateCustomer({
	//  currentCustomer,
	//  name: payload.name,
	//  corporate_number: payload.corporate_number,
	//  country: payload.country,
	//});
	//
	//// TODO: 取引先名の履歴を保存する。
	//const { invoices, ...customer } = updatedCustomer;
	//const deletedInvoices = currentCustomer.invoices.filter(
	//  (currentInvoice) => !invoices.some((invoice) => invoice.id === currentInvoice.id),
	//);
	//
	//return await prisma.$transaction([
	//  prisma.customer.update({
	//    where: { id: customer.id },
	//    data: customer,
	//  }),
	//  ...invoices.map(
	//    (invoice) => prisma.invoice.upsert({ where: { id: invoice.id }, update: invoice, create: invoice }),
	//    ...deletedInvoices.map((invoice) => prisma.invoice.delete({ where: { id: invoice.id } })),
	//  ),
	//]);
};
