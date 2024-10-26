import { z } from "zod";
import type { CustomerStatus } from "@prisma/client";

export type Customer = {
  readonly id: bigint;
  readonly code: string;
  readonly code_num: number;
  readonly name: string;
  readonly corporate_number: string;
  readonly status: CustomerStatus;
  readonly country: string | null;
  readonly invoices: Invoice[];
};

type Invoice = {
  readonly id: string;
  readonly customer_id: bigint;
  readonly start_date: Date;
  readonly end_date: Date | null;
};

const corporateNumberSchema = z.string().regex(/[0-9]{13}/, "法人番号は13桁の数字です。");
const codeNumSchema = z
  .number()
  .int()
  .min(1, "取引先コードは1以上の整数でのみ生成可能です。")
  .max(999999, "取引先コードは999999以下の整数でのみ生成可能です。");

/**
 * 取引先のコードを生成する関数。
 * 1から999999までの整数を受け取り、取引先コードを生成する。
 *
 * @param codeNum
 * @returns 生成された取引先コード
 */
const createCustomerCode = (codeNum: number): string => {
  return "C" + codeNumSchema.parse(codeNum).toString().padStart(6, "0");
};

export type CreateCustomerPayload = Omit<Customer, "code" | "status" | "invoices"> & {
  readonly invoices: Omit<Invoice, "customer_id">[];
};

/**
 * 取引先オブジェクトを生成する関数。
 *
 * @param payload
 * @returns 生成された取引先
 */
export const createCustomer = (payload: CreateCustomerPayload): Customer => {
  return {
    id: payload.id,
    code: createCustomerCode(payload.code_num),
    code_num: payload.code_num,
    name: payload.name,
    corporate_number: corporateNumberSchema.parse(payload.corporate_number),
    status: "ACTIVE",
    country: payload.country,
    invoices: payload.invoices.map((invoice) => ({ ...invoice, customer_id: payload.id })),
  };
};

export type UpdateCustomerPayload = { readonly currentCustomer: Customer } & Partial<
  Omit<CreateCustomerPayload, "id" | "code_num">
>;

/**
 * 取引先オブジェクトを更新する関数。
 *
 * @param payload
 * @returns 更新された取引先
 */
export const updateCustomer = (payload: UpdateCustomerPayload): Customer => {
  if (payload.currentCustomer.status === "INACTIVE") {
    throw new Error("アクティブでない取引先は更新できません。");
  }

  const newCorporateNumber = payload.corporate_number
    ? corporateNumberSchema.parse(payload.corporate_number)
    : undefined;

  return {
    ...payload.currentCustomer,
    name: payload.name ?? payload.currentCustomer.name,
    corporate_number: newCorporateNumber ?? payload.currentCustomer.corporate_number,
    country: payload.country ?? payload.currentCustomer.country,
  };
};
