// components/complaints/MessageBar.tsx
"use client";

import {
  ActionIcon,
  Badge,
  Box,
  Card,
  CloseButton,
  FileButton,
  Flex,
  Group,
  HoverCard,
  Image,
  Overlay,
  Paper,
  Progress,
  Stack,
  Text,
  Textarea
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconFile,
  IconPaperclip,
  IconPhoto,
  IconSend,
  IconTrash,
  IconVideo
} from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useRef, useState } from "react";
import { z } from "zod";

type MediaFile = {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video" | "pdf" | "other";
  progress?: number;
  uploading?: boolean;
};

type MessageBarProps = {
  onSubmit: (data: { Response: string; media: File[] }) => void;
  isLoading?: boolean;
  placeholder?: string;
  maxLength?: number;
  maxFiles?: number;
  maxFileSize?: number; // in MB
};

// Create schema for validation
const createMessageSchema = (maxLength: number) =>
  z.object({
    Response: z
      .string()
      .min(1, "Message cannot be empty")
      .max(maxLength, `Message cannot exceed ${maxLength} characters`),
  });

export default function MessageBar({
  onSubmit,
  isLoading = false,
  placeholder = "Type your message...",
  maxLength = 255,
  maxFiles = 10,
  maxFileSize = 20, // 20MB
}: MessageBarProps) {
  
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    initialValues: {
      Response: "",
    },
    validate: zod4Resolver(createMessageSchema(maxLength)),
  });

  const handleFileSelect = (files: File[] | FileList) => {
    const fileArray = Array.from(files);
    
    // Check max files limit
    if (mediaFiles.length + fileArray.length > maxFiles) {
      alert(`You can only attach up to ${maxFiles} files`);
      return;
    }

    const newMediaFiles: MediaFile[] = fileArray.map((file) => {
      // Validate file type
      const fileType = file.type;
      let type: MediaFile["type"] = "other";
      
      if (fileType.startsWith("image/")) type = "image";
      else if (fileType.startsWith("video/")) type = "video";
      else if (fileType === "application/pdf") type = "pdf";
      
      // Validate file size
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxFileSize) {
        alert(`File ${file.name} exceeds ${maxFileSize}MB limit`);
        return null;
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: type === "image" || type === "video" ? URL.createObjectURL(file) : "",
        type,
      };
    }).filter(Boolean) as MediaFile[];

    setMediaFiles([...mediaFiles, ...newMediaFiles]);
  };

  const removeFile = (id: string) => {
    setMediaFiles(mediaFiles.filter(file => {
      if (file.id === id && file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return file.id !== id;
    }));
  };

  const handleSubmit = form.onSubmit((values) => {
    if (mediaFiles.length === 0 && !values.Response.trim()) {
      form.setFieldError("Response", "Message cannot be empty");
      return;
    }

    onSubmit({
      Response: values.Response.trim(),
      media: mediaFiles.map(file => file.file),
    });

    // Clear form and files
    form.reset();
    mediaFiles.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    setMediaFiles([]);
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    const imageFiles = items
      .filter(item => item.type.startsWith("image/"))
      .map(item => item.getAsFile())
      .filter(Boolean) as File[];

    if (imageFiles.length > 0) {
      handleFileSelect(imageFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const getFileIcon = (type: MediaFile["type"]) => {
    switch (type) {
      case "image":
        return <IconPhoto size={20} />;
      case "video":
        return <IconVideo size={20} />;
      case "pdf":
        return <IconFile size={20} />;
      default:
        return <IconPaperclip size={20} />;
    }
  };


  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{ position: "relative" }}
    >
      {isDragging && (
        <Overlay
          opacity={0.6}
          zIndex={100}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed var(--mantine-color-blue-6)",
            borderRadius: "var(--mantine-radius-lg)",
          }}
        >
          <Stack align="center" gap="xs">
            <IconPhoto size={48}  />
            <Text c="white" fw={500} size="lg">
              Drop files here
            </Text>
            <Text c="white" size="sm">
              Supports: JPG, PNG, MP4, PDF (max {maxFileSize}MB)
            </Text>
          </Stack>
        </Overlay>
      )}

      {/* Media Preview */}
      {mediaFiles.length > 0 && (
        <Paper
          p="sm"
          radius="md"
          mb="sm"
          withBorder
          style={{
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <Group gap="xs" wrap="nowrap" align="flex-start">
            {mediaFiles.map((file) => (
              <Box key={file.id} style={{ position: "relative" }}>
                <Card
                  withBorder
                  radius="sm"
                  p="xs"
                  style={{ width: 120, height: 100 }}
                >
                  <Stack gap="xs" align="center" justify="center" h="100%">
                    {file.type === "image" ? (
                      <Image
                        src={file.preview}
                        alt={file.file.name}
                        width={80}
                        height={60}
                        fit="cover"
                        radius="xs"
                      />
                    ) : (
                      <Box
                        style={{
                          width: 80,
                          height: 60,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "var(--mantine-radius-xs)",
                        }}
                      >
                        {getFileIcon(file.type)}
                      </Box>
                    )}
                    
                    <Text size="xs" truncate style={{ width: "100%" }}>
                      {file.file.name.length > 15
                        ? file.file.name.substring(0, 12) + "..."
                        : file.file.name}
                    </Text>
                    
                    {file.uploading && file.progress !== undefined && (
                      <Progress value={file.progress} size="xs" w="100%" />
                    )}
                  </Stack>
                </Card>
                
                <CloseButton
                  size="xs"
                  variant="filled"
                  color="red"
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    zIndex: 1,
                  }}
                  onClick={() => removeFile(file.id)}
                  disabled={file.uploading}
                />
              </Box>
            ))}
          </Group>
          
          <Flex justify="space-between" align="center" mt="xs">
            <Badge variant="light" color="blue" size="sm">
              {mediaFiles.length} file{mediaFiles.length !== 1 ? "s" : ""} attached
            </Badge>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={() => {
                mediaFiles.forEach(file => {
                  if (file.preview) URL.revokeObjectURL(file.preview);
                });
                setMediaFiles([]);
              }}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Flex>
        </Paper>
      )}

      {/* Main Message Bar */}
      <Paper
        radius="lg"
        p="xs"
        shadow="xl"
        style={{
          borderColor: form.errors.Response
            ? "var(--mantine-color-red-6)"
            : "var(--mantine-color-gray-3)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Group gap="xs" align="flex-end" wrap="nowrap">
            {/* Attachment Button */}
            <FileButton
              onChange={(files) => files && handleFileSelect(files)}
              accept="image/*,video/mp4,application/pdf"
              multiple
            >
              {(props) => (
                <HoverCard width={200} position="top" withArrow shadow="md">
                  <HoverCard.Target>
                    <ActionIcon
                      {...props}
                      size="lg"
                      radius="xl"
                      variant="subtle"
                      color="blue"
                      disabled={isLoading}
                    >
                      <IconPaperclip size={20} />
                    </ActionIcon>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">
                      Attach files (JPG, PNG, MP4, PDF)
                      <br />
                      Max: {maxFileSize}MB per file
                      <br />
                      Max: {maxFiles} files
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              )}
            </FileButton>

            {/* Message Input */}
            <Textarea
              ref={textareaRef}
              {...form.getInputProps("Response")}
              placeholder={placeholder}
              autosize
              minRows={1}
              maxRows={4}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              disabled={isLoading}
              flex={1}
            />

            {/* Character Counter & Send Button */}
            <Stack gap={2} align="center">
              {form.values.Response.length > 0 && (
                <Text
                  size="xs"
                  c={
                    form.values.Response.length > maxLength
                      ? "red"
                      : form.values.Response.length > maxLength * 0.8
                      ? "orange"
                      : "dimmed"
                  }
                >
                  {form.values.Response.length}/{maxLength}
                </Text>
              )}
              
              <ActionIcon
                type="submit"
                size="lg"
                radius="xl"
                variant="filled"
                color={
                  form.values.Response.trim() || mediaFiles.length > 0
                    ? "blue"
                    : "gray"
                }
                loading={isLoading}
                disabled={
                  isLoading ||
                  (!form.values.Response.trim() && mediaFiles.length === 0)
                }
              >
                <IconSend size={20} />
              </ActionIcon>
            </Stack>
          </Group>
        </form>
      </Paper>

      {/* Error Message */}
      {form.errors.Response && (
        <Text size="xs" c="red" mt={4} ml="xs">
          {form.errors.Response}
        </Text>
      )}

      {/* Hidden file input for direct click */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*,video/mp4,application/pdf"
        multiple
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
      />
    </Box>
  );
}