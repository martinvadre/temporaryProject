import { CheckCircledIcon } from "@radix-ui/react-icons";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormProps {
    isError: boolean;
    message?: string;
};

export const FormStatusCard = ({message, isError}: FormProps) => {

    if (isError) {
        return (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <p>{message}</p>
            </div>
        );
    }

    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircledIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
};
