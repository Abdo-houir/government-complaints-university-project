"use client";

import { getUserSchema, UserSchemaType } from "@/app/validation/auth";
import { Link } from "@/i18n/navigation";
import PATHS from "@/paths";
import {
    Button,
    FocusTrap,
    Group,
    Stack,
    Text
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useTranslations } from "next-intl";
import { useMutate } from "../../../../../lib/api/react-query/useMutate";
import endpoints from "../../../../../lib/api/setup/ebdpoints";
import RegisterFormSteps from "./RegisterFormSteps";

const RegisterForm = () => {
    const { mutate, loading } = useMutate(endpoints.auth.register, [], "post", "", () => { console.log("success"); }, () => { }, true)
    const tc = useTranslations("common");
    const tA = useTranslations("auth.register");
    const tF = useTranslations("fields");

    const form = useForm<UserSchemaType>({
        initialValues: {
            FirstnameAr: "",
            LastnameAr: "",
            MiddlenameAr: "",
            BirthPlaceAr: "",
            BirthDate: new Date(),
            NationalNumber: "",
            IdFrontFace: null,
            IdBackFace: null,
            CurrentLocationAr: "",
            ContactNumber: "",
            Email: "",
            password: "",
            password_confirmation: ""
        },
        validate: zod4Resolver(getUserSchema(tF)),
        mode: "controlled",
    });

    const handleSubmit = (values: UserSchemaType) => {
        mutate(values, true);
    };


    return (
        <FocusTrap active={true}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <RegisterFormSteps
                        form={form}
                        loading={loading}
                    />
                    <Group gap={0}>
                        <Text component="p" fz="md">
                            {tA("loginSwitch")}
                        </Text>
                        <Button variant="subtle" radius="md" size="compact-md" w="fit-content" disabled={loading}>
                            <Link href={PATHS.auth.login}>
                                {tc("login")}
                            </Link>
                        </Button>
                    </Group>
                </Stack>
            </form>
        </FocusTrap>
    );
};

export default RegisterForm;
