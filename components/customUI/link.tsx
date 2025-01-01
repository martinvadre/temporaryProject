import Link from "next/link";
import { ReactNode } from 'react';

interface CLinkProps {
    children: ReactNode;
    href: string;
    isDisabled?: boolean;
    [key: string]: any;
}

export default function CLink({ children, isDisabled, href, ...props }: CLinkProps) {
    return (
        <Link
            style={{pointerEvents: isDisabled ? "none" : "auto"}}
            href={href}
            {...props}
        >
            {children}
        </Link>
    );
}
