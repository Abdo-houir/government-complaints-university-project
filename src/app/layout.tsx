"use client"
import { ReactNode } from 'react';
import "./globals.css";

type Props = {
    children: ReactNode,
}
const layout = ({ children }: Props) => {
    return (
        <html  >
            <body >
                {children}
            </body>
        </html>
    )
}

export default layout