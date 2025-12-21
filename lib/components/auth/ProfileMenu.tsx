import { Button, Menu, MenuDropdown, MenuTarget } from '@mantine/core';
import { ReactNode } from 'react';

type Props = {
    target: ReactNode;
    content?: ReactNode;
}

const ProfileMenu = ({ target, content }: Props) => {

    return (
        <Menu>
            <MenuTarget>
                <Button m={0} p={0} variant='transparent' h={"100%"} >
                    {target}
                </Button>
            </MenuTarget>
            <MenuDropdown>
                {content && content}
            </MenuDropdown>

        </Menu>
    )
}

export default ProfileMenu