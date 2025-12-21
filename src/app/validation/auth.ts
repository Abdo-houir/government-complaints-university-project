import { _Translator } from "next-intl";
import { z } from "zod";

// Allowed domains
const allowedDomains = ["gmail.com", "hotmail.com", "mail.com","gov.sy"];

export function getAuthSchema(t: _Translator) {
  return z.object({
    Email: z
      .email({ error: t("email.req") })
      .min(2, { message: t("email.min") })
      .max(50, { message: t("email.max") })
      .refine((val) => {
        const domain = val.split("@")[1]?.toLowerCase();
        return domain && allowedDomains.includes(domain);
      }, { message: t("email.type") }),
    password: z
      .string({ error: t("password.req") })
      .min(8, { message: t("password.min") })
      .max(50, { message: t("password.max") })
  });
}

export type AuthSchemaType = z.infer<Awaited<ReturnType<typeof getAuthSchema>>>;

const arabicRegex = /^[\p{Script=Arabic}\s]+$/u;
// const englishRegex = /^[a-zA-Z\s]+$/;
const numberRegex = /^[0-9]+$/;
const phoneRegex = /^[+\d\s\-()]+$/;

export function getUserSchema(t: _Translator) {
  return z.object({
    FirstnameAr: z
      .string({ error: t("FirstnameAr.req") })
      .max(255, { message: t("FirstnameAr.max") })
      .regex(arabicRegex, { message: t("FirstnameAr.regex") }),
    LastnameAr: z
      .string({ error: t("LastnameAr.req") })
      .max(255, { message: t("LastnameAr.max") })
      .regex(arabicRegex, { message: t("LastnameAr.regex") }),
    MiddlenameAr: z
      .string()
      .max(255, { message: t("MiddlenameAr.max") })
      .regex(arabicRegex, { message: t("MiddlenameAr.regex") })
      .optional(),
    BirthPlaceAr: z
      .string({ error: t("BirthPlaceAr.req") })
      .max(255, { message: t("BirthPlaceAr.max") })
      .regex(arabicRegex, { message: t("BirthPlaceAr.regex") }),
    BirthDate: z
      .preprocess((val) => (typeof val === "string" ? new Date(val) : val),
        z
          .date({ error: t("BirthDate.req") })
          .min(new Date("1900-01-01"), { error: t("BirthDate.after") })
          .max(new Date(), { error: t("BirthDate.before") })),
    NationalNumber: z
      .string({ error: t("NationalNumber.req") })
      .min(11, { message: t("NationalNumber.min") })
      .max(11, { message: t("NationalNumber.max") })
      .regex(numberRegex, { message: t("NationalNumber.regex") }),
    IdFrontFace: z
      .instanceof(File, { message: t("IdFrontFace.req") })
      .refine((file) => file.size <= 2 * 1024 * 1024, { message: t("IdFrontFace.max") })
      .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type), {
        message: t("IdFrontFace.type"),
      }).nullable(),
    IdBackFace: z
      .instanceof(File, { message: t("IdBackFace.req") })
      .refine((file) => file.size <= 2 * 1024 * 1024, { message: t("IdBackFace.max") })
      .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type), {
        message: t("IdBackFace.type"),
      }).nullable(),
    CurrentLocationAr: z
      .string({ error: t("CurrentLocationAr.req") })
      .max(255, { message: t("CurrentLocationAr.max") })
      .regex(arabicRegex, { message: t("CurrentLocationAr.regex") }),
    ContactNumber: z
      .string({ error: t("ContactNumber.req") })
      .max(20, { message: t("ContactNumber.max") })
      .regex(phoneRegex, { message: t("ContactNumber.regex") }),
    Email: z
      .email({ error: t("email.max") })
      .min(2, { message: t("email.min") })
      .max(50, { message: t("email.max") }),
    password: z
      .string({ error: t("password.req") })
      .min(8, { message: t("password.min") })
      .max(50, { message: t("password.max") }),
    password_confirmation: z
      .string({ error: t("password_confirmation.req") })
      .min(8, { message: t("password.min") })
      .max(50, { message: t("password.max") }),
  })
    .refine((data) => data.password === data.password_confirmation, {
      path: ["password_confirmation"],
      message: t("password_confirmation.match"),
    });
}

export type UserSchemaType = z.infer<ReturnType<typeof getUserSchema>>;
