import { Stack, Text } from "@mantine/core"
import { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import RegisterForm from "./RegisterForm"

export async function generateMetadata(): Promise<Metadata> {
  const tM = await getTranslations("metadata.auth.register")

  return {
    title: tM("title"),
    description: tM("description"),
  }
}

const RegisterPage = () => {
  const tA = useTranslations("auth.register")

  return (
    <Stack mt={5} w={"100%"}>
      <Stack style={{ textAlign: 'center' }}>
        <Text
          component="h1"
          fz="h2"
          c="emerald"
          fw="bold"
        >
          {tA("title")}
        </Text>
        <Text
          component="h2"
          fz="h3"
        >
          {tA("subtitle")}
        </Text>
      </Stack>
      <RegisterForm />
    </Stack>
  )
}

export default RegisterPage