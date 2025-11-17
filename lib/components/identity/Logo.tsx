import { Link } from '@/i18n/navigation';
import Image from "next/image";

type Props = {
  width: number,
  height: number,
  isSmall?: boolean,
  isLink?: boolean,
  href?: string
}

const smallLogo = "/logo/EmblemOfSyria.svg";
const bigLogo = "/logo/CoatOfArmsOfSyria.svg";

const Logo = ({
  height,
  width,
  isSmall = true,
  isLink = false,
  href
}: Props) => {

  if (isLink && !!href) {
    return (
      <Link href={href}>
        <Image src={isSmall ? smallLogo : bigLogo} alt="Logo" width={width} height={height} style={{maxWidth: "100%"}}/>
      </Link>
    )
  } else {
    return (
      <Image src={isSmall ? smallLogo : bigLogo} alt="Logo" width={width} height={height} style={{maxWidth: "100%"}}/>
    )
  }
}

export default Logo