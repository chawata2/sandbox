import { expect, test, describe } from "vitest";
import { createCustomer, type CreateCustomerPayload } from "~/server/core/domain/customer";

describe("createCustomer", () => {
  const defaultPayload: CreateCustomerPayload = {
    id: BigInt(1),
    code_num: 2,
    name: "test",
    corporate_number: "1234567890123",
    country: "JP",
    invoices: [],
  };

  test("有効データで正しく取引先を生成する。", () => {
    expect(createCustomer(defaultPayload)).toEqual({
      code: "C000002",
      code_num: 2,
      corporate_number: "1234567890123",
      country: "JP",
      id: 1n,
      invoices: [],
      name: "test",
      status: "ACTIVE",
    });
  });

  test("法人番号が無効な場合、エラーをスローする。", () => {
    const payload = { ...defaultPayload, corporate_number: "123456789012" };

    try {
      createCustomer(payload);
      expect.fail("エラーがスローされませんでした。");
    } catch (error: any) {
      expect(error.statusCode).toBe(422);
      expect(error.data).toEqual({
        invalidParams: [
          {
            path: ["corporate_number"],
            reason: "法人番号は13桁の数字です。",
          },
        ],
      });
    }
  });
});
