import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from 'react';

interface CButtonProps {
    children: ReactNode;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null;
    isLoading?: boolean;
    isDisabled?: boolean;
    [key: string]: any;
}

export default function CButton({ children, variant, isLoading, isDisabled, ...props }: CButtonProps) {
    return (
        <Button
            style={{pointerEvents: isLoading || isDisabled ? "none" : "auto"}}
            disabled={isLoading || isDisabled}
            variant={variant}
            {...props}
        >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : ""}
            {children}
        </Button>
    );
}
