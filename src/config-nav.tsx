import { BsHouseDoor } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";

export const sidebarLinks: LinkType[] = [
  {
    href: "/",
    label: "Home",
    icon: <BsHouseDoor />,
  },
  {
    href: "/explore",
    label: "Explore",
    icon: <FiMoreHorizontal />,
  },
];
