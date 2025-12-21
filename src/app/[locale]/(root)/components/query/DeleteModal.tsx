import { Alert, Button, Flex, Modal, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import { useMutate } from "../../../../../../lib/api/react-query/useMutate";
import { UseBooleanReturn } from "../../../../../../lib/hooks/useBoolean";

type Props = {
  title?: string,
  message?: string,
  endpoint: string,
  validateEndpoint: string[],
  isOpen: UseBooleanReturn
}

const DeleteModal = ({ title, message, endpoint, validateEndpoint, isOpen }: Props) => {
  const TApi = useTranslations("apiMessages");
  const tC = useTranslations("common");

  const { loading, mutate } = useMutate(
    endpoint,
    validateEndpoint,
    "delete",
    TApi("success"),
    isOpen.onFalse
  );

  const onClose = () => {
    if (!loading) {
      isOpen.onFalse()
    }
  }
  const handleSubmit = () => {
    mutate(null, true);
  };

  return (
    <>
      <Modal
        onClose={onClose}
        opened={isOpen.value}
        centered
        size="xl"
        title={
          <Text
            fz="h3"
            fw="bold"
            c="emerald"
          >
            {title || TApi("deleteTitle")}
          </Text>
        }
      >
        <Stack>
          <Alert
            variant="light"
            color="orange"
            radius="md"
            title={title || TApi("deleteTitle")}
            icon={<TbAlertSquareRoundedFilled size={25} />}
          >
            {message || TApi("deleteMessage")}
          </Alert>
          <Flex
            gap="md"
            direction={{ base: "column", md: "row" }}
          >
            <Button
              fullWidth
              radius="md"
              variant='light'
              loading={loading}
              onClick={handleSubmit}
            >
              {tC("delete")}
            </Button>
            <Button
              fullWidth
              radius="md"
              variant='subtle'
              color="red"
              disabled={loading}
              onClick={onClose}
            >
              {tC("cancel")}
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </>
  )
}

export default DeleteModal