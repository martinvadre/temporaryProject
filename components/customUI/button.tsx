import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode, forwardRef } from 'react';

interface CButtonProps extends ButtonProps {
    children: ReactNode;
    isLoading?: boolean;
    isDisabled?: boolean;
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    [key: string]: any;
}

const CButton = forwardRef<HTMLButtonElement, CButtonProps>(
    ({ children, variant, isLoading, isDisabled, size, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                style={{pointerEvents: isLoading || isDisabled ? "none" : "auto"}}
                disabled={isLoading || isDisabled}
                variant={variant}
                size={size}
                {...props}
            >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : ""}
                {(size == "icon" && isLoading) ? "" : children}
            </Button>
        );
    }
);

Button.displayName = "Button";

export default CButton;
