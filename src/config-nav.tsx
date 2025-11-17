import { BsHouseDoor, BsLaptopFill } from "react-icons/bs";
import { FcTimeline } from "react-icons/fc";
import PATHS from "./paths";

export const sidebarLinks: LinkType[] = [
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
    ]
  },
];
