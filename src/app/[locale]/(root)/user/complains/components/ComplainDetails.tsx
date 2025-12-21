import { Badge, Box, Button, Card, Divider, Grid, Group, Paper, Progress, Stack, Text, Title } from '@mantine/core';
import { IconFileTypeDoc, IconFileTypePdf, IconFileTypeTxt, IconFileTypeXls } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { FaCalendar, FaDownload, FaEye, FaPaperclip } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import ImageFetcher from '../../../../../../../lib/api/ImageFetcher';
import dayjs from '../../../../../../../lib/dayjs';
import CitizenResponses from './CitizenResponses/CitizenResponses';
import { getComplainStatusColor } from './ComplainCard';

type Props = {
  complaint: complaintDetailsType;
};

// Helper to determine file type icon
const getFileIcon = (extension: string) => {
  const ext = extension.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext)) {
    return null; // We'll use Image component for images
  }
  if (ext === 'pdf') return <IconFileTypePdf size={24} color="#e53935" />;
  if (['doc', 'docx'].includes(ext)) return <IconFileTypeDoc size={24} color="#2196f3" />;
  if (['xls', 'xlsx'].includes(ext)) return <IconFileTypeXls size={24} color="#4caf50" />;
  if (['txt', 'text'].includes(ext)) return <IconFileTypeTxt size={24} color="#757575" />;
  return <FaPaperclip size={20} />;
};

// Helper to check if file is an image
const isImage = (extension: string) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
  return imageExtensions.includes(extension.toLowerCase());
};

const ComplainDetails = ({ complaint }: Props) => {
  const tComplains = useTranslations("complains");
  const tCommon = useTranslations("common");

  return (
    <Box p={{ base: '0', md: 'lg' }}>
      <Button
        variant="subtle"
        mb="md"
        leftSection={<FaEye />}
      >
        {tCommon("backToList")}
      </Button>
      <Card radius="lg" shadow="lg" p={{ base: 'md', md: 'xl' }}>
        <Stack gap="xl">
          {/* Header Section */}
          <Group justify="space-between" align="flex-start" wrap="wrap">
            <Box style={{ flex: 1 }}>
              <Title order={1} size="h2" c="emerald" mb="xs" style={{ textWrap: "nowrap" }}>
                {complaint.Title}
              </Title>
              <Group gap="xs" align="center">
                <Badge
                  variant="light"
                  color={getComplainStatusColor(complaint.status)}
                  size="lg"
                  radius="xl"
                >
                  {tComplains(`status.${complaint.status}`)}
                </Badge>
                <Badge
                  variant="outline"
                  color="gray"
                  size="sm"
                >
                  #{complaint.id}
                </Badge>
              </Group>
            </Box>
            {/* Date Info */}
            <Paper withBorder p="md" radius="md">
              <Group gap="xs" align="center">
                <FaCalendar size={18} />
                <Text size="sm" fw={600}>
                  {tComplains("sendDate")}:
                </Text>
                <Text size="sm">
                  {dayjs(complaint.complaint_created_at).format('D MMMM YYYY - HH:mm')}
                </Text>
              </Group>
            </Paper>
          </Group>

          <Box mt="xl">
            <Text size="sm" fw={500} mb="xs">
              {tComplains("progress")}:
            </Text>
            <Progress
              value={complaint.status === 'جديدة' ? 10 :
                complaint.status === 'قيد المعالجة' ? 40 :
                  complaint.status === 'بانتظار الرد من المواطن' ? 60 :
                    complaint.status === 'منجزة' ? 100 : 30}
              color={getComplainStatusColor(complaint.status)}
              animated
            />
            <Group justify="space-between" mt={4}>
              {['جديدة', 'قيد المعالجة', 'بانتظار الرد من المواطن', 'منجزة'].map((status) => (
                <Text
                  key={status}
                  size="xs"
                  c={complaint.status === status ? getComplainStatusColor(status) : 'dimmed'}
                  fw={complaint.status === status ? 600 : 400}
                >
                  {tComplains(`status.${status}`)}
                </Text>
              ))}
            </Group>
          </Box>
          <Divider />
          {/* Content Section */}
          <Box>
            <Group mb="md" gap="xs">
              <FaMessage size={20} />
              <Text fw={600} size="lg">
                {tComplains("details")}
              </Text>
            </Group>
            <Paper
              p="lg"
              radius="md"
              withBorder
              style={{
                backgroundColor: 'var(--color-background-primary)',
                whiteSpace: 'pre-wrap'
              }}
            >
              <Text size="md">
                {complaint.Content}
              </Text>
            </Paper>
          </Box>
          <CitizenResponses
            id={complaint.id}
          />
          {/* Media Attachments Section */}
          {complaint.media && complaint.media.length > 0 && (
            <Box>
              <Group mb="md" gap="xs">
                <FaPaperclip size={20} />
                <Text fw={600} size="lg">
                  {tComplains("attachments")} ({complaint.media.length})
                </Text>
              </Group>

              <Grid gutter="md">
                {complaint.media.map((file) => (
                  <Grid.Col key={file.id} span={{ base: 12, sm: 6, md: 4 }}>
                    <Card
                      withBorder
                      padding="md"
                      radius="md"
                      style={{ height: '100%' }}
                    >
                      <Stack gap="md" align="center">
                        {isImage(file.extension) ? (
                          <Box style={{ width: '100%', height: 200, position: 'relative' }}>
                            <ImageFetcher endpoint={file.url} alt="ID Front" h={"100%"} w={"100%"} imageProps={{ radius: "md", fit: "cover" }} />
                          </Box>
                        ) : (
                          <Box
                            style={{
                              width: '100%',
                              height: 200,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'var(--mantine-color-gray-1)',
                              borderRadius: 'var(--mantine-radius-sm)',
                            }}
                          >
                            {getFileIcon(file.extension)}
                          </Box>
                        )}

                        <Box style={{ width: '100%' }}>
                          <Text
                            size="sm"
                            fw={500}
                            truncate
                            title={file.file_name}
                            mb={4}
                          >
                            {file.file_name}
                          </Text>

                          <Group justify="space-between" align="center">
                            <Text size="xs" c="dimmed">
                              {dayjs(file.created_at).format('DD/MM/YYYY')}
                            </Text>

                            <Button
                              variant="subtle"
                              size="xs"
                              component="a"
                              href={file.url}
                              download={file.file_name}
                              target="_blank"
                              rel="noopener noreferrer"
                              leftSection={<FaDownload size={14} />}
                            >
                              {tCommon("download")}
                            </Button>
                          </Group>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          )}

          {/* Status Progress Bar (same as card) */}

        </Stack>
      </Card>
    </Box>
  );
};

export default ComplainDetails;