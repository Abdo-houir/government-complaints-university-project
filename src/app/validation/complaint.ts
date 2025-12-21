// schemas/complaint.schema.ts
import { _Translator } from 'next-intl';
import { z } from 'zod';


export function getComplaintSchema(t: _Translator) {
    return z.object({
        Title: z
            .string()
            .min(1, { message: t("Title.min") })
            .max(255, { message: t("Title.max") }),
        Content: z
            .string()
            .min(1, { message: t("Content.min") }),
        media: z
            .array(z.instanceof(File))
            .optional()
            .default([])
    })
}

export type ComplaintFormData = z.infer<ReturnType<typeof getComplaintSchema>>;