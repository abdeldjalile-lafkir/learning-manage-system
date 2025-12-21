import { Resend } from "resend";
import { VerifyIdentityEmail } from "@/components/templates/verify-identity-email";
import { ResetPasswordEmail } from "@/components/templates/reset-password-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (
  email: string,
  type: string,
  options: unknown
) => {
  switch (type) {
    case "email-verification":
      try {
        const { data, error } = await resend.emails.send({
          from: "abdeldjalile@abdeldjalile.me",
          to: email,
          subject: "Verify your email address",
          react: await VerifyIdentityEmail({
            otp: (options as { otp: string }).otp,
          }),
        });
        console.log(data, error);
        if (error) {
          console.log(error);
          return error;
        }
        return data;
      } catch (error) {
        console.log(error);
        return error;
      }

    case "reset-password":
      try {
        const { data, error } = await resend.emails.send({
          from: "abdeldjalile@abdeldjalile.me",
          to: email,
          subject: "Reset your password",
          react: await ResetPasswordEmail({
            userName: (options as { user: { name?: string } }).user.name,
            url: (options as { url: string }).url,
          }),
        });
        if (error) {
          return error;
        }
        return data;
      } catch (error) {
        return error;
      }
    default:
      console.log(`Unknown email type: ${type}`);
  }
};
