import { AxiosError } from "axios";

export const handleErrorMessageDecider = (error: Error | AxiosError) => {

    if (error.message) {
        return error.message
    } else {
        return "some thing went wrong"
    }
}