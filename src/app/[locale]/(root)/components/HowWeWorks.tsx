import { Card, Container, Text, Timeline, TimelineItem } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { Slide, Zoom } from "react-awesome-reveal";
import { BsPersonPlusFill } from "react-icons/bs";
import { GiProcessor } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { MdTipsAndUpdates } from "react-icons/md";
import { RiContractFill } from "react-icons/ri";


const HowWeWorks = async () => {
  const t = await getTranslations("home.howWeWorks");

  const workTimeLineIcons: ReactNode[] = [
    <BsPersonPlusFill size={30} key="BsPersonPlusFill" />,
    <RiContractFill size={30} key="RiContractFill" />,
    <IoMdNotifications size={30} key="IoMdNotifications" />,
    <GiProcessor size={30} key="GiProcessor" />,
    <MdTipsAndUpdates size={30} key="MdTipsAndUpdates" />
  ];

  const workTimeLine: workTimeLine[] = Array.from({ length: 5 }, (_, index) => ({
    title: t(`${index + 1}.title`),
    content: t(`${index + 1}.content`),
    icon: workTimeLineIcons[index]
  }));

  return (
    <Slide direction="up" triggerOnce>
      <Card mt={20} id="howWeWorks" >
        <Slide direction="right" delay={100} triggerOnce>
          <Text fz="h2" component="h2" c="var(--mantine-primary-color-5)" fw="bold">
            {t("title")}
          </Text>
          <Text fz="h3" component="p">
            {t("description")}
          </Text>
        </Slide>
        <Zoom delay={100} triggerOnce>
          <Container fluid mt={25} w={"100%"}>
            <Timeline active={4} bulletSize={45} lineWidth={2} >
              {
                workTimeLine.map((workStep) => (
                  <TimelineItem bullet={workStep.icon} title={workStep.title} key={workStep.title} fw={700} fz="lg">
                    <Text c="dimmed" maw={800} fw={700} fz="md">
                      {workStep.content}
                    </Text>
                  </TimelineItem>
                ))
              }
            </Timeline>
          </Container>
        </Zoom>
      </Card>
    </Slide>
  );
}

export default HowWeWorks