// app/validation/manager/employees.ts
import { _Translator } from "next-intl";
import { z } from "zod";

const arabicRegex = /^[\p{Script=Arabic}\s]+$/u;
const englishRegex = /^[a-zA-Z\s]+$/;
const numberRegex = /^[0-9]+$/;

export function getEmployeeSchema(t: _Translator, isEdit: boolean = false) {
    return z.object({
        // Personal Information
        FirstnameAr: z
            .string({ error: t("FirstnameAr.req") })
            .max(100, { message: t("FirstnameAr.max") })
            .regex(arabicRegex, { message: t("FirstnameAr.regex") }),
        FirstnameEn: z
            .string({ error: t("FirstnameEn.req") })
            .max(100, { message: t("FirstnameEn.max") })
            .regex(englishRegex, { message: t("FirstnameEn.regex") }),
        MiddlenameAr: z
            .string({ error: t("MiddlenameAr.req") })
            .max(100, { message: t("MiddlenameAr.max") })
            .regex(arabicRegex, { message: t("MiddlenameAr.regex") }),
        MiddlenameEn: z
            .string({ error: t("MiddlenameEn.req") })
            .max(100, { message: t("MiddlenameEn.max") })
            .regex(englishRegex, { message: t("MiddlenameEn.regex") }),
        LastnameAr: z
            .string({ error: t("LastnameAr.req") })
            .max(100, { message: t("LastnameAr.max") })
            .regex(arabicRegex, { message: t("LastnameAr.regex") }),
        LastnameEn: z
            .string({ error: t("LastnameEn.req") })
            .max(100, { message: t("LastnameEn.max") })
            .regex(englishRegex, { message: t("LastnameEn.regex") }),

        // Birth Information
        BirthPlaceAr: z
            .string({ error: t("BirthPlaceAr.req") })
            .max(100, { message: t("BirthPlaceAr.max") })
            .regex(arabicRegex, { message: t("BirthPlaceAr.regex") }),
        BirthPlaceEn: z
            .string({ error: t("BirthPlaceEn.req") })
            .max(100, { message: t("BirthPlaceEn.max") })
            .regex(englishRegex, { message: t("BirthPlaceEn.regex") }),
        BirthDate: z
            .string({ error: t("BirthDate.req") })
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: t("BirthDate.format") }),

        // National Number
        NationalNumber: z
            .string({ error: t("NationalNumber.req") })
            .min(11, { message: t("NationalNumber.min") })
            .max(11, { message: t("NationalNumber.max") })
            .regex(numberRegex, { message: t("NationalNumber.regex") }),

        // Location
        CurrentLocationAr: z
            .string({ error: t("CurrentLocationAr.req") })
            .max(255, { message: t("CurrentLocationAr.max") })
            .regex(arabicRegex, { message: t("CurrentLocationAr.regex") }),
        CurrentLocationEn: z
            .string({ error: t("CurrentLocationEn.req") })
            .max(255, { message: t("CurrentLocationEn.max") })
            .regex(englishRegex, { message: t("CurrentLocationEn.regex") }),

        // Contact
        ContactNumber: z
            .string({ error: t("ContactNumber.req") })
            .min(10, { message: t("ContactNumber.req") })
            .max(10, { message: t("NationalNumber.max") }),
        Email: z
            .string({ error: t("Email.req") })
            .email({ message: t("Email.format") })
            .max(255, { message: t("Email.max") }),

        // Password (only required for create)
        password: isEdit
            ? z
                .string()
                .min(6, { message: t("password.min") })
                .or(z.literal(""))
            : z
                .string({ error: t("password.req") })
                .min(6, { message: t("password.min") }),

        // Employment
        EmploymentStatus: z
            .boolean(),
        EmploymentDate: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: t("EmploymentDate.format") }),

        // Permissions
        CanResponseToComplaint: z
            .boolean(),

        CanChangeComplaintStatus: z
            .boolean()
    });
}

export type EmployeeSchemaType = z.infer<ReturnType<typeof getEmployeeSchema>>;