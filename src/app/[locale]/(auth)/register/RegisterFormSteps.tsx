"use client"
import { UserSchemaType } from "@/app/validation/auth"
import { Button, FileInput, Flex, Grid, GridCol, Group, Image, PasswordInput, Stepper, StepperCompleted, StepperStep, Text, TextInput } from "@mantine/core"
import { DatePickerInput } from '@mantine/dates'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { UseFormReturnType } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"

type Props = {
    form: UseFormReturnType<UserSchemaType>,
    loading: boolean
}

const RegisterFormSteps = ({ form, loading }: Props) => {
    const tF = useTranslations("fields");
    const tC = useTranslations("common")
    const [active, setActive] = useState(0);
    const nextStep = () => {
        if (active === 0) {
            if (!form.validateField("FirstnameAr").hasError && !form.validateField("LastnameAr").hasError && !form.validateField("MiddlenameAr").hasError && !form.validateField("BirthPlaceAr").hasError) {
                setActive((current) => (current < 4 ? current + 1 : current));
            }
        }
        if (active === 1) {
            if (!form.validateField("BirthDate").hasError && !form.validateField("CurrentLocationAr").hasError && !form.validateField("ContactNumber").hasError) {
                setActive((current) => (current < 4 ? current + 1 : current));
            }
        }
        if (active === 2) {
            if (!form.validateField("NationalNumber").hasError && !form.validateField("IdFrontFace").hasError && !form.validateField("IdBackFace").hasError) {
                setActive((current) => (current < 4 ? current + 1 : current));
            }
        }

    }
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const locale = useLocale()

    const file = form.values.IdFrontFace;

    return (
        <>
            <Stepper active={active}  >
                <StepperStep  >
                    <Grid>
                        <GridCol span={{ base: 12, sm: 6, md: 12, lg: 6 }}>
                            <TextInput
                                disabled={loading}
                                label={tF("FirstnameAr.label")}
                                description={tF("FirstnameAr.description")}
                                {...form.getInputProps("FirstnameAr")}
                                error={form.errors.FirstnameAr}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, sm: 6, md: 12, lg: 6 }}>
                            <TextInput
                                disabled={loading}
                                label={tF("LastnameAr.label")}
                                description={tF("LastnameAr.description")}
                                {...form.getInputProps("LastnameAr")}
                                error={form.errors.LastnameAr}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, sm: 6, md: 12, lg: 6 }}>
                            <TextInput
                                disabled={loading}
                                label={tF("MiddlenameAr.label")}
                                description={tF("MiddlenameAr.description")}
                                {...form.getInputProps("MiddlenameAr")}
                                error={form.errors.MiddlenameAr}
                            />
                        </GridCol>
                        <GridCol span={{ base: 12, sm: 6, md: 12, lg: 6 }}>
                            <TextInput
                                disabled={loading}
                                label={tF("BirthPlaceAr.label")}
                                description={tF("BirthPlaceAr.description")}
                                {...form.getInputProps("BirthPlaceAr")}
                                error={form.errors.BirthPlaceAr}
                            />
                        </GridCol>
                    </Grid>
                </StepperStep>
                <StepperStep  >
                    <DatePickerInput
                        label={tF("BirthDate.label")}
                        description={tF("BirthDate.description")}
                        {...form.getInputProps("BirthDate")}
                        error={form.errors.BirthDate}
                        locale={locale}
                        type="default"
                        valueFormat="YYYY MMM DD"
                        disabled={loading}
                    />
                    <TextInput
                        disabled={loading}
                        label={tF("CurrentLocationAr.label")}
                        description={tF("CurrentLocationAr.description")}
                        {...form.getInputProps("CurrentLocationAr")}
                        error={form.errors.CurrentLocationAr}
                    />
                    <TextInput
                        disabled={loading}
                        label={tF("ContactNumber.label")}
                        description={tF("ContactNumber.description")}
                        {...form.getInputProps("ContactNumber")}
                        error={form.errors.ContactNumber}
                    />
                </StepperStep>
                <StepperStep >
                    <TextInput
                        disabled={loading}
                        label={tF("NationalNumber.label")}
                        description={tF("NationalNumber.description")}
                        {...form.getInputProps("NationalNumber")}
                        error={form.errors.NationalNumber}
                    />
                    <Dropzone
                        disabled={loading}
                        accept={IMAGE_MIME_TYPE}
                        maxFiles={1}
                        onDrop={(files) => {
                            // update form value with the first file
                            form.setFieldValue('IdFrontFace', files[0]);
                        }}
                        onReject={(files) => {
                            console.log('Rejected files', files);
                        }}
                        {...form.getInputProps('IdFrontFace')}
                    >

                        <Group style={{ minHeight: 150 }}>
                            {file ? (
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    fit="contain"
                                    width={200}
                                />
                            ) : (
                                <Text>Drag image here or click to select</Text>
                            )}
                        </Group>
                    </Dropzone>
                    <FileInput
                        label={tF("IdBackFace.label")}
                        {...form.getInputProps("IdBackFace")}
                        error={form.errors.IdBackFace}
                        disabled={loading}
                    />
                </StepperStep>
                <StepperStep  >
                    <TextInput
                        disabled={loading}
                        label={tF("email.label")}
                        description={tF("email.description")}
                        {...form.getInputProps("Email")}
                        error={form.errors.Email}
                    />
                    <PasswordInput
                        disabled={loading}
                        label={tF("password.label")}
                        description={tF("password.description")}
                        {...form.getInputProps("password")}
                        error={form.errors.password}
                    />
                    <PasswordInput
                        disabled={loading}
                        label={tF("password_confirmation.label")}
                        description={tF("password_confirmation.description")}
                        {...form.getInputProps("password_confirmation")}
                        error={form.errors.password_confirmation}
                    />
                </StepperStep>
                <StepperCompleted>
                    Completed, click back button to get to previous step
                </StepperCompleted>
            </Stepper>
            <Flex justify="center" gap={15} mt="xl">
                {
                    active !== 0 &&
                    <Button
                        variant="outline"
                        color="red"
                        onClick={prevStep}
                        fullWidth
                        disabled={loading}
                    >
                        {tC("prev")}
                    </Button>
                }
                {
                    active !== 3 ?
                        <Button
                            onClick={nextStep}
                            fullWidth
                            disabled={loading}
                        >
                            {tC("next")}
                        </Button>
                        : <Button
                            disabled={loading}
                            fullWidth
                            type="submit"
                        >
                            {tC("register")}
                        </Button>
                }
            </Flex>
        </>
    )
}

export default RegisterFormSteps