import { _Translator } from "next-intl";
import { z } from "zod";

const arabicRegex = /^[\p{Script=Arabic}\s]+$/u;
const englishRegex = /^[a-zA-Z\s]+$/;

export function getSectionSchema(t: _Translator) {
    return z.object({
        NameAr: z
            .string({ error: t("NameAr.req") })
            .max(100, { message: t("NameAr.max") })
            .regex(arabicRegex, { message: t("NameAr.regex") }),
        NameEn: z
            .string({ error: t("NameEn.req") })
            .max(100, { message: t("NameEn.max") })
            .regex(englishRegex, { message: t("NameEn.regex") }),
        DescriptionAr: z
            .string({ error: t("DescriptionAr.req") })
            .max(500, { message: t("DescriptionAr.max") })
            .regex(arabicRegex, { message: t("DescriptionAr.regex") }),
        DescriptionEn: z
            .string({ error: t("DescriptionEn.req") })
            .max(500, { message: t("DescriptionEn.max") })
            .regex(englishRegex, { message: t("DescriptionEn.regex") }),

    })
}

export type SectionSchemaType = z.infer<ReturnType<typeof getSectionSchema>>;

/* NameEn
DescriptionAr
DescriptionEn */