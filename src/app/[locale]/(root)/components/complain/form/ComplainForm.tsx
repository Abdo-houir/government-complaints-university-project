// components/complaint/ComplaintForm.tsx
'use client';

import { ComplaintFormData, getComplaintSchema } from '@/app/validation/complaint';
import { useRouter } from '@/i18n/navigation';
import PATHS from '@/paths';
import {
    ActionIcon,
    Alert,
    Badge,
    Box,
    Button,
    Card,
    Group,
    Progress,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Textarea
} from '@mantine/core';
import { Dropzone, DropzoneAccept, DropzoneIdle, DropzoneReject, FileRejection, FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { FaFile, FaFilePdf, FaFileVideo, FaImage, FaPaperclip, FaUpload } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useMutate } from '../../../../../../../lib/api/react-query/useMutate';
import endpoints from '../../../../../../../lib/api/setup/ebdpoints';

type Props = {
    AgencyId: number
    SectionId: number
}

const ComplaintForm = ({ AgencyId, SectionId }: Props) => {
    const { replace } = useRouter();

    const Tf = useTranslations("fields.complain");
    const tC = useTranslations("common");
    const tAPI = useTranslations("apiMessages");
    const [uploadProgress] = useState<Record<string, number>>({});
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const [uploadErrors, setUploadErrors] = useState<string[]>([]); // Added this line

    const form = useForm<ComplaintFormData>({
        initialValues: {
            Title: '',
            Content: '',
            media: [],
        },
        validate: zod4Resolver(getComplaintSchema(Tf)), // Fixed: changed from zod4Resolver to zodResolver
    });

    const removeFile = (index: number) => {
        const currentFiles = [...(form.values.media || [])];
        const removedFile = currentFiles[index];
        currentFiles.splice(index, 1);
        form.setFieldValue('media', currentFiles);

        // Remove preview
        if (removedFile && removedFile.name && previews[removedFile.name]) {
            const newPreviews = { ...previews };
            delete newPreviews[removedFile.name];
            setPreviews(newPreviews);
        }

        // Clear errors when file is removed
        if (uploadErrors.length > 0) {
            setUploadErrors([]);
        }
    };

    const handleFileChange = (files: FileWithPath[] | null) => {
        // Clear previous errors
        setUploadErrors([]);
        form.clearFieldError('media');

        if (!files || files.length === 0) {
            form.setFieldValue('media', []);
            setPreviews({});
            return;
        }

        // Combine existing files with new ones
        const existingFiles = form.values.media || [];
        const totalFiles = [...existingFiles, ...files];

        // Validate file count
        if (totalFiles.length > 10) {
            const errorMsg = Tf("media.FilesLimit");
            form.setFieldError('media', errorMsg);
            setUploadErrors([errorMsg]);
            return;
        }

        // Validate individual files
        const newErrors: string[] = [];
        files.forEach((file) => {
            // Check file size
            if (file.size > 20 * 1024 * 1024) {
                newErrors.push(`${file.name}: ${Tf("media.maxFileSize")}`);
            }

            // Check file type
            const allowedTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'video/mp4',
                'application/pdf'
            ];
            if (!allowedTypes.includes(file.type)) {
                newErrors.push(`${file.name}: ${Tf("media.mimesError")}`);
            }
        });

        if (newErrors.length > 0) {
            setUploadErrors(newErrors);
            form.setFieldError('media', newErrors[0]);
            return;
        }

        // Create previews for images
        const newPreviews: Record<string, string> = {};
        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        newPreviews[file.name] = e.target.result as string;
                        setPreviews(prev => ({ ...prev, ...newPreviews }));
                    }
                };
                reader.readAsDataURL(file);
            }
        });

        form.setFieldValue('media', totalFiles);
    };

    const handleDropzoneReject = (files: FileRejection[]) => {
        const errors: string[] = [];
        files.forEach((file) => {
            file.errors.forEach((error) => {
                if (error.code === 'file-too-large') {
                    errors.push(`${file.file.name}: ${Tf("media.maxFileSize")}`);
                } else if (error.code === 'file-invalid-type') {
                    errors.push(`${file.file.name}: ${Tf("media.mimesError")}`);
                } else if (error.code === 'too-many-files') {
                    errors.push(Tf("media.FilesLimit"));
                }
            });
        });
        setUploadErrors(errors);
        if (errors.length > 0) {
            form.setFieldError('media', errors[0]);
        }
    };

    const getFileIcon = (file: File) => {
        const iconSize = 20;
        if (file.type.startsWith('image/')) {
            return <FaImage size={iconSize} color="var(--mantine-color-blue-6)" />;
        }
        if (file.type.startsWith('video/')) {
            return <FaFileVideo size={iconSize} color="var(--mantine-color-red-6)" />;
        }
        if (file.type === 'application/pdf') {
            return <FaFilePdf size={iconSize} color="var(--mantine-color-red-7)" />;
        }
        return <FaFile size={iconSize} color="var(--mantine-color-gray-6)" />;
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' بايت';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' كيلوبايت';
        return (bytes / (1024 * 1024)).toFixed(1) + ' ميجابايت';
    };

    const { loading, mutate } = useMutate(
        endpoints.complains.createComplaint,
        [],
        "post",
        tAPI("success"),
        () => {
            replace(PATHS.citizen.complains.index)
        },
        () => { },
        true

    )
    const handleSubmit = async (values: ComplaintFormData) => {
        const apiData = {
            AgencyId: AgencyId,
            SectionId: SectionId,
            ...values
        }
        mutate(apiData)
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
                <TextInput
                    withAsterisk
                    label={Tf("Title.label")}
                    placeholder={Tf("Title.placeholder")}
                    {...form.getInputProps('Title')}
                    maxLength={50}
                    description={Tf("Title.description")}
                    disabled={loading}
                />

                <Textarea
                    withAsterisk
                    label={Tf("Content.label")}
                    placeholder={Tf("Content.placeholder")}
                    autosize
                    minRows={4}
                    maxRows={10}
                    {...form.getInputProps('Content')}
                    description={Tf("Content.description")}
                    disabled={loading}
                />

                {/* File Upload Section */}
                <div>
                    <Group justify="space-between" mb="xs">
                        <Text fw={500} size="sm">
                            {Tf("media.label")}
                        </Text>
                        <Badge color="gray" variant="light">
                            {Tf("media.max")}
                        </Badge>
                    </Group>

                    <Dropzone
                        onDrop={(files: FileWithPath[]) => {
                            setUploadErrors([]); // Clear errors on successful drop
                            handleFileChange(files);
                        }}
                        onReject={handleDropzoneReject}
                        accept={[
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                            'video/mp4',
                            'application/pdf'
                        ]}
                        maxSize={20 * 1024 * 1024} // 20MB
                        maxFiles={10}
                        multiple={true}
                        style={{
                            borderStyle: 'dashed',
                            cursor: 'pointer',
                            backgroundColor: form.errors.media || uploadErrors.length > 0
                                ? 'var(--mantine-color-red-light)'
                                : undefined,
                        }}
                        radius="md"
                        disabled={loading}
                    >
                        <Group justify="center" gap="xl" style={{ minHeight: 80, pointerEvents: 'none' }}>
                            <DropzoneAccept>
                                <FaUpload size={40} style={{ color: 'var(--mantine-color-blue-6)' }} />
                            </DropzoneAccept>
                            <DropzoneReject>
                                <IoMdClose size={40} style={{ color: 'var(--mantine-color-red-6)' }} />
                            </DropzoneReject>
                            <DropzoneIdle>
                                <FaPaperclip size={40} style={{ color: 'var(--mantine-color-dimmed)' }} />
                            </DropzoneIdle>

                            <div>
                                <Text size="xl" inline>
                                    {form.values.media?.length === 0
                                        ? Tf("media.dragDrop")
                                        : `${form.values.media?.length} ${Tf("media.selectedFiles")}`
                                    }
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    {Tf("media.mimes")}
                                </Text>
                                {(form.errors.media || uploadErrors.length > 0) && (
                                    <Text size="sm" c="red" mt={5}>
                                        {uploadErrors[0] || form.errors.media}
                                    </Text>
                                )}
                            </div>
                        </Group>
                    </Dropzone>

                    {/* File Previews */}
                    {form.values.media && form.values.media.length > 0 && (
                        <Stack gap="sm" mt="md">
                            <Text size="sm" fw={500}>
                                {Tf("media.selectedFiles")}
                            </Text>
                            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                                {form.values.media.map((file, index) => (
                                    <Card
                                        key={`${file.name}-${index}`}
                                        withBorder
                                        padding="sm"
                                        radius="md"
                                    >
                                        <Group justify="space-between">
                                            <Group gap="xs">
                                                {getFileIcon(file)}
                                                <Box style={{ flex: 1 }}>
                                                    <Text size="sm" truncate="end">
                                                        {file.name}
                                                    </Text>
                                                    <Text size="xs" c="dimmed">
                                                        {formatFileSize(file.size)}
                                                    </Text>
                                                </Box>
                                            </Group>
                                            <ActionIcon
                                                color="red"
                                                variant="subtle"
                                                size="sm"
                                                onClick={() => removeFile(index)}
                                            >
                                                <IoMdClose size={14} />
                                            </ActionIcon>
                                        </Group>

                                        {/* Image Preview */}
                                        {file.type.startsWith('image/') && previews[file.name] && (
                                            <Box mt="xs" style={{ height: '300px', overflow: 'hidden' }}>
                                                <Image
                                                    src={previews[file.name]}
                                                    alt={file.name}
                                                    width={200}
                                                    height={100}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px',
                                                    }}
                                                />
                                            </Box>
                                        )}

                                        {/* Video Preview Placeholder */}
                                        {file.type.startsWith('video/') && (
                                            <Box mt="xs" style={{
                                                height: '100px',
                                                backgroundColor: 'var(--mantine-color-gray-1)',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <FaFileVideo size={32} color="var(--mantine-color-gray-5)" />
                                            </Box>
                                        )}

                                        {/* PDF Preview Placeholder */}
                                        {file.type === 'application/pdf' && (
                                            <Box mt="xs" style={{
                                                height: '100px',
                                                backgroundColor: 'var(--mantine-color-red-light)',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <FaFilePdf size={32} color="var(--mantine-color-red-6)" />
                                            </Box>
                                        )}

                                        {/* Upload Progress (if uploading) */}
                                        {uploadProgress[file.name] !== undefined && (
                                            <Progress
                                                value={uploadProgress[file.name]}
                                                size="sm"
                                                mt="xs"
                                                animated
                                            />
                                        )}
                                    </Card>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    )}

                    {/* Upload Progress for all files */}
                    {Object.keys(uploadProgress).length > 0 && (
                        <Alert color="blue" variant="light" mt="md" icon={<FaUpload size={16} />}>
                            <Text size="sm">جاري رفع الملفات...</Text>
                            <Progress
                                value={Object.values(uploadProgress).reduce((a, b) => a + b, 0) / Object.keys(uploadProgress).length}
                                size="lg"
                                mt="xs"
                                animated
                            />
                        </Alert>
                    )}

                    {/* Error Alert for upload failures */}
                    {uploadErrors.length > 0 && (
                        <Alert color="red" variant="light" mt="md" icon={<IoMdClose size={16} />}>
                            <Text size="sm">فشل رفع بعض الملفات:</Text>
                            <Stack gap="xs" mt="xs">
                                {uploadErrors.map((error, idx) => (
                                    <Text key={idx} size="xs" c="red">
                                        • {error}
                                    </Text>
                                ))}
                            </Stack>
                        </Alert>
                    )}
                </div>
                <Group justify="flex-end" mt="md">
                    <Button
                        type="submit"
                        leftSection={<FaPaperclip size={16} />}
                        fullWidth
                        loading={loading}
                    >
                        {tC("submit")}
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}

export default ComplaintForm;