import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";
import { getTranslations } from "next-intl/server";

export const VerifyIdentityEmail = async (options: {
  otp: string;
  userName?: string;
  baseUrl?: string;
  expiresInMinutes?: number;
}) => {
  const {
    otp,
    userName = "User",
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "",
    expiresInMinutes = 60,
  } = options;

  const t = await getTranslations("emails.VerifyIdentityEmail");

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

              {/* Code Label */}
              <Text className="mb-2 text-base font-semibold text-gray-800">
                {t("codeLabel")}
              </Text>
              <Section className="bg-[rgba(0,0,0,.05)] rounded mx-auto font-[HelveticaNeue-Bold] mt-1 mb-3.5 align-middle w-70">
                <Text className="text-black text-[32px] font-bold tracking-[6px] leading-10 py-2 mx-auto my-0 block text-center">
                  {otp}
                </Text>
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
