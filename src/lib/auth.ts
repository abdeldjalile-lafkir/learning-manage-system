import { betterAuth } from "better-auth";
import { prisma } from "@/lib/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { sendMail } from "@/lib/mail";

export const auth = betterAuth({
  // appName: process.env.APP_NAME || "My App",
  // baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // basePath: "/api/auth",
  // secret: process.env.BETTER_AUTH_SECRET || "super-secret-key",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  user: {},
  account: {},
  session: {},
  verification: {},

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    disableSignUp: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendMail(user.email, "reset-password", { user, url, token });
    },
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 10 * 60,
    //onPasswordReset:  function () {},
    //password: function () {},
    //minPasswordLength: 8,
    //maxPasswordLength: 128,
  },

  // socialProviders:[]

  emailVerification: {
    sendOnSignUp: false,
    sendOnSignIn: false,
    autoSignInAfterVerification: false,
    expiresIn: 10 * 60,
    //sendVerificationEmail: function () {},
    // onEmailVerification : function () {},
    // afterEmailVerification : function () {},
  },

  sendVerificationOnSignUp: true,
  overrideDefaultEmailVerification: true,
  storeOTP: "hashed",

  // trustedOrigins : ["http://localhost:3000"],
  // rateLimit : {},
  //databaseHooks: {},

  logger: {
    disabled: false,
    disableColors: false,
    level: "info",
    log: (level: string, message: string, ...args: unknown[]) => {
      console.log(`[${level.toUpperCase()}] ${message}`, ...args);
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          await sendMail(email, "email-verification", { otp });
        }
      },
    }),
  ],
});
