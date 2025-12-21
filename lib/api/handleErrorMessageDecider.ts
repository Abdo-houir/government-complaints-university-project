import { _Translator } from "next-intl"

export const handleErrorMessageDecider =  (error: unknown,t:_Translator) => {
    const factoredError: ErrorMessageType = error as ErrorMessageType

    if (!!factoredError.message) {
        return factoredError.message
    } else if (!!factoredError.error) {
        return factoredError.error
    } else {
        return t("wrong")
    }
}