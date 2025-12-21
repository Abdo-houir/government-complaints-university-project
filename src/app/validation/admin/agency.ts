// app/validation/manager/agency.ts
import { _Translator } from "next-intl";
import { z } from "zod";

const arabicRegex = /^[\p{Script=Arabic}\s]+$/u;
const englishRegex = /^[a-zA-Z\s]+$/;
const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // HH:mm format

export function getAgencySchema(t: _Translator) {
    return z.object({
        NameAr: z
            .string({ error: t("NameAr.req") })
            .min(2, { error: t("NameAr.req") })
            .max(255, { message: t("NameAr.max") })
            .regex(arabicRegex, { message: t("NameAr.regex") }),
        NameEn: z
            .string({ error: t("NameEn.req") })
            .min(2, { error: t("NameEn.req") })
            .max(255, { message: t("NameEn.max") })
            .regex(englishRegex, { message: t("NameEn.regex") }),
        DescriptionAr: z
            .string({ error: t("DescriptionAr.req") })
            .min(2, { error: t("DescriptionAr.req") }),
        DescriptionEn: z
            .string({ error: t("DescriptionEn.req") })
            .min(2,{ error: t("DescriptionEn.req") }),
        LocationAr: z
            .string({ error: t("LocationAr.req") })
            .min(2,{ error: t("LocationAr.req") }),
        LocationEn: z
            .string({ error: t("LocationEn.req") })
            .min(2,{ error: t("LocationEn.req") }),
        WorkingStartTime: z
            .string({ error: t("WorkingStartTime.req") })
            .regex(timeRegex, { message: t("WorkingStartTime.format") }),
        WorkingEndTime: z
            .string({ error: t("WorkingEndTime.req") })
            .regex(timeRegex, { message: t("WorkingEndTime.format") }),
        Status: z
            .enum(["true", "false", "1", "0"])
            .transform(val => val === "true" || val === "1")
            .or(z.boolean())
            .default(true),
        ParentId: z
            .string()
            .transform(val => val === "" || val === "null" ? null : parseInt(val))
            .refine(val => val === null || (Number.isInteger(val) && val > 0), {
                message: t("ParentId.integer")
            })
            .optional()
            .nullable(),
        ManagerId: z
            .string()
            .transform(val => val === "" || val === "null" ? null : parseInt(val))
            .refine(val => val === null || (Number.isInteger(val) && val > 0), {
                message: t("ManagerId.integer")
            })
            .optional()
            .nullable(),
    }).refine(data => {
        // Check if WorkingEndTime is after WorkingStartTime
        const startTime = data.WorkingStartTime;
        const endTime = data.WorkingEndTime;

        if (!startTime || !endTime) return true;

        const start = new Date(`2000-01-01T${startTime}:00`);
        const end = new Date(`2000-01-01T${endTime}:00`);

        return end > start;
    }, {
        message: t("timeComparison"),
        path: ["WorkingEndTime"]
    })
}

export type AgencySchemaType = z.infer<ReturnType<typeof getAgencySchema>>;