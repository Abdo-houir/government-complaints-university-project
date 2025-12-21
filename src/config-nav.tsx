import { BsFillQuestionOctagonFill, BsHouseDoor, BsLaptopFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { FaBuildingColumns, FaPeopleGroup } from "react-icons/fa6";
import { FcTimeline } from "react-icons/fc";
import { IoChatboxEllipses } from "react-icons/io5";
import PATHS from "./paths";

export const questLinks: LinkType[] = [
  {
    href: PATHS.home.index,
    label: "home",
    icon: <BsHouseDoor />,
    children: [
      {
        href: PATHS.home.services,
        label: "ourServices",
        icon: <BsLaptopFill />,
      },
      {
        href: PATHS.home.howWeWorks,
        label: "howWeWorks",
        icon: <FcTimeline />,
      },
      {
        href: PATHS.home.faq,
        label: "faq",
        icon: <BsFillQuestionOctagonFill />,
      },
    ]
  }
];

export const citizenLinks = [
  {
    href: PATHS.citizen.agencies.index,
    label: "agencies",
    icon: <FaBuildingColumns />
  },
  {
    href: PATHS.citizen.complains.index,
    label: "complains",
    icon: <FaClipboardList />
  },
  ...questLinks
];

export const managerLinks: LinkType[] =  [
  {
      href: PATHS.agencyManager.employees.index,
      label: "employees",
      icon: <FaPeopleGroup />
  },
  {
      href: PATHS.agencyManager.sections.index,
      label: "sections",
      icon: <FaBuildingColumns />
  },
  ...questLinks
]

export const employeeLinks: LinkType[] =  [
  {
      href: PATHS.employee.complains,
      label: "complains",
      icon: <IoChatboxEllipses />
  },
  ...questLinks
]

export const footerLinks: LinkType[] = [
  {
    href: PATHS.home.index,
    label: "home",
    icon: <BsHouseDoor />,
    children: [
      {
        href: PATHS.home.services,
        label: "ourServices",
        icon: <BsLaptopFill />,
      },
      {
        href: PATHS.home.howWeWorks,
        label: "howWeWorks",
        icon: <FcTimeline />,
      },
      {
        href: PATHS.home.faq,
        label: "faq",
        icon: <BsFillQuestionOctagonFill />,
      },
    ]
  },
];
