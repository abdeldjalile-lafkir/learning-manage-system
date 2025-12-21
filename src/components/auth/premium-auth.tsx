"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  KeyRound,
  Phone,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/authhandler";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

// Types
type AuthMode = "login" | "signup" | "reset";
type RegistrationStep = "details" | "verification" | "complete";

interface AuthFormProps {
  /**
   * Callback triggered when authentication is successful
   */
  onSuccess?: (userData: { email: string; name?: string }) => void;
  /**
   * Callback triggered when the form should close
   */
  onClose?: () => void;
  /**
   * Initial authentication mode
   * @default 'login'
   */
  initialMode?: AuthMode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeToTerms: boolean;
  rememberMe: boolean;
  verificationCode: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  agreeToTerms?: string;
  general?: string;
  verificationCode?: string;
}

// Password strength utility
interface PasswordStrength {
  score: number;
  feedback: string[];
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

const calculatePasswordStrength = (
  password: string,
  requirementsText: { [key: string]: string }
): PasswordStrength => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

  const score = Object.values(requirements).filter(Boolean).length;
  const feedback: string[] = [];

  if (!requirements.length) feedback.push(requirementsText.lengthh);
  if (!requirements.uppercase) feedback.push(requirementsText.uppercase);
  if (!requirements.lowercase) feedback.push(requirementsText.lowercase);
  if (!requirements.number) feedback.push(requirementsText.number);
  if (!requirements.special) feedback.push(requirementsText.special);
  return { score, feedback, requirements };
};

// Password Strength Indicator Component
const PasswordStrengthIndicator: React.FC<{ password: string }> = ({
  password,
}) => {
  const t = useTranslations("pages.AuthPage.passwordStrength");
  const requirements = {
    lengthh: t("requirements.length"),
    uppercase: t("requirements.uppercase"),
    lowercase: t("requirements.lowercase"),
    number: t("requirements.number"),
    special: t("requirements.special"),
  };
  const strength = calculatePasswordStrength(password, requirements);

  const getStrengthColor = (score: number) => {
    if (score <= 1) return "text-destructive";
    if (score <= 2) return "text-orange-500";
    if (score <= 3) return "text-yellow-500";
    if (score <= 4) return "text-blue-500";
    return "text-primary";
  };

  const getStrengthText = (score: number) => {
    if (score <= 1) return t("veryWeak");
    if (score <= 2) return t("weak");
    if (score <= 3) return t("fair");
    if (score <= 4) return t("good");
    return t("strong");
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2 animate-in fade-in-50 slide-in-from-bottom-1">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full ${getStrengthColor(
              strength.score
            )} bg-current rounded-full`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground min-w-15">
          {getStrengthText(strength.score)}
        </span>
      </div>
      {strength.feedback.length > 0 && (
        <div className="grid grid-cols-2 gap-1">
          {strength.feedback.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-xs text-amber-500 dark:text-amber-400"
            >
              <AlertTriangle className="h-3 w-3" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * AuthForm - A comprehensive authentication form component
 *
 * A customizable authentication form supporting login, signup, and password reset
 * flows with real-time validation and password strength indicators.
 */
export function AuthForm({
  onSuccess,
  onClose,
  initialMode = "login",
  className,
}: AuthFormProps) {
  // State
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const [registrationStep, setRegistrationStep] =
    useState<RegistrationStep>("details");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
    rememberMe: false,
    verificationCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});

  const router = useRouter();
  const t = useTranslations("pages.AuthPage");

  const requirements = React.useMemo(() => {
    return {
      lengthh: t("passwordStrength.requirements.length"),
      uppercase: t("passwordStrength.requirements.uppercase"),
      lowercase: t("passwordStrength.requirements.lowercase"),
      number: t("passwordStrength.requirements.number"),
      special: t("passwordStrength.requirements.special"),
    };
  }, [t]);

  // Load saved email on mount
  React.useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    if (savedEmail && authMode === "login") {
      setFormData((prev) => ({ ...prev, email: savedEmail, rememberMe }));
    }
  }, [authMode]);

  // Field validation
  const validateField = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      let error = "";

      switch (field) {
        case "name":
          if (
            typeof value === "string" &&
            authMode === "signup" &&
            !value.trim()
          ) {
            error = t("errors.nameRequired");
          }
          break;

        case "email":
          if (!value || (typeof value === "string" && !value.trim())) {
            error = t("errors.emailRequired");
          } else if (
            typeof value === "string" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ) {
            error = t("errors.emailInvalid");
          }
          break;

        case "password":
          if (!value) {
            error = t("errors.passwordRequired");
          } else if (typeof value === "string") {
            if (value.length < 8) {
              error = t("errors.passwordMinLength");
            } else if (authMode === "signup") {
              const strength = calculatePasswordStrength(value, requirements);
              if (strength.score < 3) {
                error = t("errors.passwordWeak");
              }
            }
          }
          break;

        case "confirmPassword":
          if (authMode === "signup" && value !== formData.password) {
            error = t("errors.confirmPasswordMismatch");
          }
          break;

        case "phone":
          if (
            typeof value === "string" &&
            value &&
            !/^\+?[\d\s\-()]+$/.test(value)
          ) {
            error = t("errors.phoneInvalid");
          }
          break;

        case "verificationCode":
          if (
            typeof value === "string" &&
            authMode === "signup" &&
            registrationStep === "verification" &&
            !/^\d{6}$/.test(value)
          ) {
            error = t("errors.verificationCodeInvalid");
          }
          break;

        case "agreeToTerms":
          if (authMode === "signup" && !value) {
            error = t("errors.agreeToTerms");
          }
          break;
      }

      return error;
    },
    [formData.password, authMode, registrationStep, t, requirements]
  );

  // Handle input changes with real-time validation
  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Real-time validation for touched fields
      if (fieldTouched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error || undefined }));
      }
    },
    [fieldTouched, validateField]
  );

  // Handle field blur (mark as touched)
  const handleFieldBlur = useCallback(
    (field: keyof FormData) => {
      setFieldTouched((prev) => ({ ...prev, [field]: true }));
      const value = formData[field];
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error || undefined }));
    },
    [formData, validateField]
  );

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof FormData)[] = ["email", "password"];

    if (authMode === "signup") {
      fieldsToValidate.push("name", "confirmPassword", "agreeToTerms");
    }

    if (registrationStep === "verification") {
      fieldsToValidate.push("verificationCode");
    }

    if (authMode === "reset") {
      fieldsToValidate.pop();
    }

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [authMode, registrationStep, formData, validateField]);

  // Handle form submission - this would be replaced with your actual authentication logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (authMode === "login") {
        const { data, error } = await authClient.signIn.email(
          {
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
            callbackURL: "/dashboard",
          },
          {
            onSuccess: async (ctx) => {
              setSuccessMessage(t("success.login"));
              onSuccess?.({ email: formData.email });
            },
            onError: (ctx) => {
              setErrors({ general: t("errors.general") });
            },
          }
        );
      } else if (authMode === "signup") {
        if (registrationStep === "details") {
          const { data, error } = await authClient.signUp.email(
            {
              email: formData.email,
              password: formData.password,
              name: formData.name,
              callbackURL: "/dashboard",
            },
            {
              onSuccess: async (ctx) => {
                const { data, error } =
                  await authClient.emailOtp.sendVerificationOtp(
                    {
                      email: formData.email,
                      type: "email-verification",
                    },
                    {
                      onSuccess: (ctx) => {
                        setSuccessMessage(t("success.verification"));
                        setRegistrationStep("complete");
                        onSuccess?.({
                          email: formData.email,
                          name: formData.name,
                        });
                      },
                      onError: (ctx) => {
                        setErrors({ general: t("errors.general") });
                      },
                    }
                  );
                setSuccessMessage(t("success.signup"));
                setRegistrationStep("verification");
              },
              onError: (ctx) => {
                setErrors({ general: t("errors.general") });
              },
            }
          );
        } else if (registrationStep === "verification") {
          const { data, error } = await authClient.emailOtp.verifyEmail(
            {
              email: formData.email,
              otp: formData.verificationCode,
            },
            {
              onRequest: (ctx) => {
                //show loading
              },
              onSuccess: (ctx) => {
                setSuccessMessage(t("success.verification"));
                setRegistrationStep("complete");
                onSuccess?.({ email: formData.email, name: formData.name });
              },
              onError: (ctx) => {
                setErrors({ general: t("errors.general") });
              },
            }
          );
        }
      } else if (authMode === "reset") {
        const { data, error } = await authClient.requestPasswordReset(
          {
            email: formData.email,
            redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/reset-password`,
          },
          {
            onSuccess: (ctx) => {
              setSuccessMessage(t("success.reset"));
            },
            onError: (ctx) => {
              setErrors({ general: t("errors.general") });
            },
          }
        );
      }
    } catch (error) {
      setErrors({
        general: t("errors.general"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render auth form content based on mode and step
  const renderAuthContent = () => {
    // Password reset form
    if (authMode === "reset") {
      return (
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
          <div className="text-center mb-6">
            <KeyRound className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2"> {t("reset.header")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("reset.description")}
            </p>
          </div>

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                placeholder={t("reset.fields.email")}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleFieldBlur("email")}
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.email ? "border-destructive" : "border-input"
                )}
                aria-label="Email Address"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && (
              <p
                id="email-error"
                className="text-destructive text-xs mt-1 flex items-center gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !formData.email}
            className={cn(
              "w-full relative bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all",
              "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20",
              "disabled:opacity-50"
            )}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <KeyRound className="h-5 w-5" />
                  {t("reset.button")}
                </>
              )}
            </span>
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              {t("reset.backToLogin")}
            </button>
          </div>
        </div>
      );
    }

    // Email verification step
    if (authMode === "signup" && registrationStep === "verification") {
      return (
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
          <div className="text-center mb-6">
            <Mail className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">
              {t("verification.header")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("verification.description")}{" "}
              <span className="font-medium">{formData.email}</span>
            </p>
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                placeholder={t("verification.inputPlaceholder")}
                value={formData.verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  handleInputChange("verificationCode", value);
                }}
                onBlur={() => handleFieldBlur("verificationCode")}
                className={cn(
                  "w-full text-center py-3 px-4 bg-muted/50 border rounded-xl text-2xl font-mono tracking-widest placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.verificationCode
                    ? "border-destructive"
                    : "border-input"
                )}
                maxLength={6}
                aria-label="Verification Code"
                aria-describedby={
                  errors.verificationCode ? "code-error" : undefined
                }
              />
            </div>
            {errors.verificationCode && (
              <p
                id="code-error"
                className="text-destructive text-xs mt-1 flex items-center gap-1 justify-center"
              >
                <AlertTriangle className="h-3 w-3" />
                {errors.verificationCode}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || formData.verificationCode.length !== 6}
            className={cn(
              "w-full relative bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all",
              "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20",
              "disabled:opacity-50"
            )}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                t("verification.button")
              )}
            </span>
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setRegistrationStep("details")}
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              {t("verification.backToDetails")}
            </button>
          </div>
        </div>
      );
    }

    // Registration complete step
    if (authMode === "signup" && registrationStep === "complete") {
      return (
        <div className="text-center space-y-6 animate-in fade-in-50 slide-in-from-right-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">{t("complete.header")}</h3>
            <p className="text-muted-foreground">{t("complete.description")}</p>
          </div>

          <button
            onClick={() => {
              setAuthMode("login");
              router.refresh();
            }}
            className={cn(
              "w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl",
              "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
          >
            {t("complete.button")}
          </button>
        </div>
      );
    }

    // Default login/signup form
    return (
      <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
        {authMode === "signup" && (
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("signup.fields.name")}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleFieldBlur("name")}
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.name ? "border-destructive" : "border-input"
                )}
                aria-label="Full Name"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </div>
            {errors.name && (
              <p
                id="name-error"
                className="text-destructive text-xs mt-1 flex items-center gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>
        )}

        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              placeholder={t("login.fields.email")}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              className={cn(
                "w-full pl-10 pr-4 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                errors.email ? "border-destructive" : "border-input"
              )}
              aria-label="Email Address"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
          {errors.email && (
            <p
              id="email-error"
              className="text-destructive text-xs mt-1 flex items-center gap-1"
            >
              <AlertTriangle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("login.fields.password")}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onBlur={() => handleFieldBlur("password")}
              className={cn(
                "w-full pl-10 pr-12 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                errors.password ? "border-destructive" : "border-input"
              )}
              aria-label="Password"
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p
              id="password-error"
              className="text-destructive text-xs mt-1 flex items-center gap-1"
            >
              <AlertTriangle className="h-3 w-3" />
              {errors.password}
            </p>
          )}
          {authMode === "signup" && (
            <PasswordStrengthIndicator password={formData.password} />
          )}
        </div>

        {authMode === "signup" && (
          <div>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("signup.fields.confirmPassword")}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                onBlur={() => handleFieldBlur("confirmPassword")}
                className={cn(
                  "w-full pl-10 pr-12 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.confirmPassword ? "border-destructive" : "border-input"
                )}
                aria-label="Confirm Password"
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="text-destructive text-xs mt-1 flex items-center gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {authMode === "signup" && (
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="tel"
                placeholder={t("signup.fields.phone")}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={() => handleFieldBlur("phone")}
                className={cn(
                  "w-full pl-10 pr-4 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.phone ? "border-destructive" : "border-input"
                )}
                aria-label="Phone Number"
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
            </div>
            {errors.phone && (
              <p
                id="phone-error"
                className="text-destructive text-xs mt-1 flex items-center gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                {errors.phone}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          {authMode === "login" ? (
            <>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    handleInputChange("rememberMe", e.target.checked)
                  }
                  aria-label="Remember me"
                  className="w-4 h-4 rounded border-input bg-muted text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-muted-foreground">
                  {t("login.rememberMe")}
                </span>
              </label>
              <button
                type="button"
                onClick={() => setAuthMode("reset")}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                {t("login.forgotPassword")}
              </button>
            </>
          ) : (
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className="w-4 h-4 mt-0.5 rounded border-input bg-muted text-primary focus:ring-primary focus:ring-offset-0"
                aria-describedby={
                  errors.agreeToTerms ? "terms-error" : undefined
                }
              />
              <span className="text-sm text-muted-foreground">
                {t("signup.agreeToTerms")}{" "}
                <a
                  href="#"
                  className="text-primary hover:underline transition-colors"
                >
                  {t("signup.termsOfService")}
                </a>{" "}
                {t("signup.and")}{" "}
                <a
                  href="#"
                  className="text-primary hover:underline transition-colors"
                >
                  {t("signup.privacyPolicy")}
                </a>
              </span>
            </label>
          )}
        </div>

        {errors.agreeToTerms && (
          <p
            id="terms-error"
            className="text-destructive text-xs flex items-center gap-1"
          >
            <AlertTriangle className="h-3 w-3" />
            {errors.agreeToTerms}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full relative bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl transition-all",
            "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:opacity-50"
          )}
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : authMode === "login" ? (
              t("login.button")
            ) : (
              t("signup.button")
            )}
          </span>
        </button>
      </div>
    );
  };

  return (
    <div
      className={cn("p-6", className)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-5">
          <svg
            className="h-4 w-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-green-700 dark:text-green-300 text-sm">
            {successMessage}
          </span>
        </div>
      )}

      {/* Error Message */}
      {errors.general && (
        <div className="mb-4 p-3 bg-destructive/20 border border-destructive/30 rounded-xl flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <span className="text-destructive text-sm">{errors.general}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h2 id="auth-title" className="text-2xl font-bold mb-2">
          {authMode === "login"
            ? t("login.title")
            : authMode === "reset"
              ? t("reset.title")
              : t("signup.title")}
        </h2>
        <p className="text-muted-foreground">
          {authMode === "login"
            ? t("login.subtitle")
            : authMode === "reset"
              ? t("reset.subtitle")
              : t("signup.subtitle")}
        </p>
      </div>

      {/* Mode Toggle Tabs (only show for login/signup) */}
      {authMode !== "reset" && (
        <div className="flex bg-muted rounded-xl p-1 mb-6">
          <button
            onClick={() => setAuthMode("login")}
            className={cn(
              "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
              authMode === "login"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            type="button"
          >
            {t("login.button")}
          </button>
          <button
            onClick={() => {
              setAuthMode("signup");
              setRegistrationStep("details");
            }}
            className={cn(
              "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              authMode === "signup"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            type="button"
          >
            {t("signup.button")}
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>{renderAuthContent()}</form>

      {/* Toggle between login/signup at bottom */}
      {authMode !== "reset" && registrationStep === "details" && (
        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            {authMode === "login"
              ? t("login.toggleSignup")
              : t("signup.toggleLogin")}
            <button
              type="button"
              onClick={() =>
                setAuthMode(authMode === "login" ? "signup" : "login")
              }
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {authMode === "login"
                ? t("login.toggleSignupButton")
                : t("signup.toggleLoginButton")}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
