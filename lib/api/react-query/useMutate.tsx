import { notifications } from "@mantine/notifications";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { handleErrorMessageDecider } from "../handleErrorMessageDecider";
import useAxiosMutation from "./useAxiosMutation";


export const useMutate = (
    endpoint: string,
    validateEndpoints: string[],
    method: MethodType,
    message: string,
    callBack?: () => void,
    failCallback?: () => void,
    isEncoded?: boolean,
    refetch?: boolean
) => {
    const queryClient = useQueryClient();
    const Mutation = useAxiosMutation(
        endpoint,
        method,
        isEncoded ? {
            headers: { "Content-Type": "multipart/form-data" },
        } : {}
    );

    return {
        mutate: (input: unknown, withNotification: boolean = true) => {
            let id: string;
            if (withNotification) {
                id = notifications.show({
                    position: "top-right",
                    draggable: true,
                    id: endpoint,
                    title: 'Loading',
                    message: "please wait a moment",
                    autoClose: false,
                    withCloseButton: false,
                    loading: true
                })
            }
            Mutation.mutate(input, {
                onSuccess: (response: unknown) => {
                    if (refetch) {
                        queryClient.resetQueries(validateEndpoints as InvalidateQueryFilters<readonly unknown[]>)
                    } else {
                        queryClient.invalidateQueries(validateEndpoints as InvalidateQueryFilters<readonly unknown[]>)
                    }
                    if (withNotification) {
                        notifications.update({
                            id,
                            color: "green",
                            title: 'Success',
                            message: message,
                            withCloseButton: true,
                            loading: false
                        })
                    } if (callBack) callBack()

                    return response;
                },
                onError: (error: unknown) => {
                    if (withNotification) {
                        notifications.update({
                            id,
                            color: "red",
                            position: "top-right",
                            draggable: true,
                            title: 'Error',
                            message: handleErrorMessageDecider(error as Error | AxiosError),
                            autoClose: false,
                            withCloseButton: true,
                            loading: false
                        })
                    } if (failCallback) failCallback()
                }
            })
        },
        loading: Mutation.isPending
    }
}