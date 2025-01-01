import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Text } from "@react-email/components";
import * as React from "react";

interface EmailVerificationEmailProps {
    username?: string;
    url?: string;
}

export default function EmailVerificationEmail ({ username, url }: EmailVerificationEmailProps): React.ReactElement {
    return (
        <Html>
            <Head />
            <Preview>
                Please confirm your email address.
            </Preview>
            <Body style={main}>
            <Container style={container}>

                <Text style={title}>
                    Please confirm your email address.
                </Text>

                <Section style={section}>
                <Text style={text}>
                    Hey <strong>{username}</strong>!
                </Text>
                <Text style={text}>
                    Please click the button below to confirm your email address.
                </Text>

                <Button style={button} href={url}>Confirm</Button>
                </Section>
            </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#ffffff",
    color: "#24292e",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "20px 0 48px",
};

const title = {
    fontSize: "24px",
    lineHeight: 1.25,
};

const section = {
    padding: "24px",
    border: "solid 1px #dedede",
    borderRadius: "5px",
    textAlign: "center" as const,
};

const text = {
    margin: "0 0 10px 0",
    textAlign: "left" as const,
};

const button = {
    fontSize: "14px",
    backgroundColor: "#0366d6",
    color: "#fff",
    lineHeight: 1.5,
    borderRadius: "0.5em",
    padding: "12px 24px",
};

const links = {
    textAlign: "center" as const,
};

const link = {
    color: "#0366d6",
    fontSize: "12px",
};

const footer = {
    color: "#6a737d",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "60px",
};
