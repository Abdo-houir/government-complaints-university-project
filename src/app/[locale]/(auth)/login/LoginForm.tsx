"use client"
import useAuthContext from "@/app/context/auth/useAuthContext"
import { AuthSchemaType, getAuthSchema } from "@/app/validation/auth"
import { Link } from "@/i18n/navigation"
import PATHS from "@/paths"
import { Button, FocusTrap, Group, PasswordInput, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useTranslations } from "next-intl"
import { IoMdMail } from "react-icons/io"
import { SiSimplelogin } from "react-icons/si"

const LoginForm = () => {
    const { login } = useAuthContext();
    const tc = useTranslations("common");
    const tA = useTranslations("auth.login");

    const tF = useTranslations("fields");

    const fieldsInfo = {
        email: {
            label: tF("email.label"),
            description: tF("email.description"),
            key: "Email"
        },
        password: {
            label: tF("password.label"),
            description: tF("password.description"),
            key: "password"
        }
    };

    const form = useForm<AuthSchemaType>({
        initialValues: {
            Email: "",
            password: "",
        },
        validate: zod4Resolver(getAuthSchema(tF)),
        mode: "controlled",
    });

    const handleSubmit = (values: AuthSchemaType) => {
        login.mutate(values);
    };
    return (
        <FocusTrap active={true} >
            <form
                onSubmit={form.onSubmit(handleSubmit)}
            >
                <Stack>
                    <TextInput
                        disabled={login.loading}
                        label={fieldsInfo.email.label}
                        description={fieldsInfo.email.description}
                        rightSection={<IoMdMail />}
                        radius="md"
                        {...form.getInputProps("Email")}
                        error={form.errors.Email}
                    />
                    <PasswordInput
                        disabled={login.loading}
                        label={fieldsInfo.password.label}
                        description={fieldsInfo.password.description}
                        radius="md"
                        {...form.getInputProps("password")}
                        error={form.errors.password}
                    />
                    <Button
                        loading={login.loading}
                        leftSection={<SiSimplelogin size={20} />}
                        variant="filled"
                        radius="md"
                        type="submit"
                    >
                        {tc("login")}
                    </Button>
                    <Group gap={0}>
                        <Text
                            component="p"
                            fz="md"
                        >

                            {tA("registerSwitch")}
                        </Text>
                        <Button
                            disabled={login.loading}
                            variant="subtle"
                            radius="md"
                            size="compact-md"
                            w="fit-content"
                        >
                            <Link href={PATHS.auth.register}>
                                {tc("register")}
                            </Link>
                        </Button>
                    </Group>
                </Stack>
            </form>
        </FocusTrap>
    )
}

export default LoginForm