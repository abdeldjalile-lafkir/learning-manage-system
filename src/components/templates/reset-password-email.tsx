import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";
import { getTranslations } from "next-intl/server";

export const ResetPasswordEmail = async (options: {
  url: string;
  userName?: string;
  baseUrl?: string;
  expiresInMinutes?: number;
}) => {
  const {
    url,
    userName = "User",
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "",
    expiresInMinutes = 60,
  } = options;

  const t = await getTranslations("emails.ResetPasswordEmail");

  return (
    <Html className="rounded-2xl max-w-4xl mx-auto">
      <Tailwind>
        <Head />
        <Body className="font-sans rounded-2xl max-w-4xl mx-auto">
          <Container className="mx-auto my-8 max-w-150 rounded-2xl bg-white px-6 py-8 shadow-sm">
            {/* Logo Section */}
            <Section className="mb-8 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={`${baseUrl}/logo.png`}
                alt={t("logoAlt")}
                className="mx-auto h-12 w-auto"
              />
            </Section>

            {/* Main Content */}
            <Section className="text-center">
              <Heading className="mb-4 text-2xl font-bold text-gray-900">
                {t("heading")}
              </Heading>

              <Text className="mb-4 text-base leading-relaxed text-gray-700">
                {t("greeting", { userName })}
              </Text>

              <Text className="mb-6 text-base leading-relaxed text-gray-700">
                {t("body")}
              </Text>

              {/* CTA Button */}
              <Section className="mb-6 text-center">
                <Button
                  href={url}
                  className="inline-block rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white no-underline hover:bg-blue-700"
                >
                  {t("buttonText")}
                </Button>
              </Section>

              {/* URL Fallback */}
              <Text className="mb-6 text-center text-sm text-gray-600">
                {t("fallbackText")}
              </Text>
              <Section className="mb-6 rounded-md bg-gray-100 px-4 py-3">
                <Text className="break-all text-sm text-gray-800">{url}</Text>
              </Section>

              {/* Expiration Warning */}
              <Section className="mb-6 rounded-md  px-4 py-3 text-center">
                <Text className="text-sm">
                  {t("expirationWarning", { minutes: expiresInMinutes })}
                </Text>
              </Section>

              {/* Security Note */}
              <Section className="mb-6 rounded-md  px-4 py-3 text-center">
                <Text className="text-sm font-medium ">
                  {t("securityNote")}
                </Text>
              </Section>
            </Section>

            <Hr className="my-6 border-gray-200" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="mb-2 text-sm text-gray-600">
                {t("footer.needHelp")}
              </Text>
              <Text className="mb-4 text-sm text-gray-600">
                {t("footer.contact")}{" "}
                <a
                  href={`mailto:${t("footer.supportEmail")}`}
                  className="text-blue-600 underline"
                >
                  {t("footer.supportEmail")}
                </a>
              </Text>
              <Text className="text-xs text-gray-500">
                {t("footer.copyright")}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
