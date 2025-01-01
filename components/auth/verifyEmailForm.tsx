"use client";

import { JSX, useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/libs/actions/verifications";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import CButton from "../customUI/button";
import { FormStatusCard } from "../customUI/formCard";

export default function VerifyEmailForm(): JSX.Element {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const verifyEmail = useCallback(async () => {
        if (success || error) return;

        if (!token) {
            setError("Token not found!");
            return;
        }

        const res = await newVerification(token);

        if (res.error) {
            setError(res.error);
        }
        else {
            setSuccess(res.success as string);
        }

    }, [token, success, error]);

    useEffect(() => {
        verifyEmail();
    }, [verifyEmail]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Card className="w-[400px] shadow-md">
                <CardHeader>
                    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                        <h1 className={"text-3xl font-semibold"}>
                            🔐 Auth
                        </h1>
                        <p className="text-muted-foreground text-sm">Confirming your verification</p>
                    </div>
                </CardHeader>
                <CardContent>
                    {error == "" && success == "" && (
                        <div className="flex items-center justify-center">
                            <BeatLoader/>
                        </div>
                    )}
                    {
                        error != "" && (
                            <FormStatusCard isError={true} message={error} />
                        )
                    }
                    {
                        success != "" && (
                            <FormStatusCard isError={false} message={success} />
                        )
                    }
                </CardContent>
                <CardFooter>
                    <CButton className="w-full" onClick={() => window.location.href = "/auth/signin"}>
                        Back to login
                    </CButton>
                </CardFooter>
            </Card>
        </div>
    );
}
