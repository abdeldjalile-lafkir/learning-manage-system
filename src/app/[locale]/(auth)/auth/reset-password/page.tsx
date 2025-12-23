"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  KeyRound,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/authhandler";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

// Types and utilities (same as AuthForm)
type ResetStep = "form" | "success";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

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

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({
  password,
}) => {
  const t = useTranslations("pages.ResetPasswordPage.passwordStrength");
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
            className={`h-full ${getStrengthColor(strength.score)} bg-current rounded-full`}
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

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const [step, setStep] = useState<ResetStep>("form");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});
  const t = useTranslations("pages.ResetPasswordPage");

  const requirements = React.useMemo(() => {
    return {
      lengthh: t("passwordStrength.requirements.length"),
      uppercase: t("passwordStrength.requirements.uppercase"),
      lowercase: t("passwordStrength.requirements.lowercase"),
      number: t("passwordStrength.requirements.number"),
      special: t("passwordStrength.requirements.special"),
    };
  }, [t]);

  // Same validation logic as AuthForm
  const validateField = useCallback(
    (field: keyof FormData, value: string) => {
      let error = "";

      switch (field) {
        case "newPassword":
          if (!value) {
            error = t("errors.passwordRequired");
          } else if (value.length < 8) {
            error = t("errors.passwordMinLength");
          } else {
            const strength = calculatePasswordStrength(value, requirements);
            if (strength.score < 3) {
              error = t("errors.passwordWeak");
            }
          }
          break;

        case "confirmPassword":
          if (value !== formData.newPassword) {
            error = t("errors.confirmPasswordMismatch");
          }
          break;
      }
      return error;
    },
    [formData.newPassword, requirements, t]
  );

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (fieldTouched[field]) {
        const error = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: error || undefined }));
      }
    },
    [fieldTouched, validateField]
  );

  const handleFieldBlur = useCallback(
    (field: keyof FormData) => {
      setFieldTouched((prev) => ({ ...prev, [field]: true }));
      const value = formData[field];
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error || undefined }));
    },
    [formData, validateField]
  );

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    ["newPassword", "confirmPassword"].forEach((field) => {
      const error = validateField(
        field as keyof FormData,
        formData[field as keyof FormData]
      );
      if (error) newErrors[field as keyof FormErrors] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !token) return;

    setIsLoading(true);
    setErrors({});

    try {
      const { data, error } = await authClient.resetPassword(
        {
          newPassword: formData.newPassword,
          token,
        },
        {
          onSuccess: async (ctx) => {
            setSuccessMessage(t("success.reset"));
            setStep("success");
          },
          onError: (ctx) => {
            setErrors({ general: t("errors.general") });
          },
        }
      );
    } catch (error) {
      setErrors({ general: t("errors.general") });
    } finally {
      setIsLoading(false);
    }
  };

  // Success step (same as AuthForm complete step)
  if (step === "success") {
    return (
      <div className="p-6">
        <div className="text-center space-y-6 animate-in fade-in-50 slide-in-from-right-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
            <h3 className="text-2xl font-bold mb-2">{t("success.header")}</h3>
            <p className="text-muted-foreground">{t("success.description")}</p>
          </div>
          <button
            onClick={() => router.push("/auth")}
            className={cn(
              "w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-xl",
              "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
          >
            {t("success.button")}
          </button>
        </div>
      </div>
    );
  }

  // Form content (EXACT same styling as AuthForm reset mode)
  return (
    <div
      className="p-6 my-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-title"
    >
      {/* Success/Error messages - same as AuthForm */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-xl flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-5">
          <svg
            className="h-4 w-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      {errors.general && (
        <div className="mb-4 p-3 bg-destructive/20 border border-destructive/30 rounded-xl flex items-center gap-2 animate-in fade-in-0 slide-in-from-top-5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <span className="text-destructive text-sm">{errors.general}</span>
        </div>
      )}

      {/* Header - same as AuthForm reset */}
      <div className="text-center mb-6">
        <KeyRound className="h-12 w-12 text-primary mx-auto mb-3" />
        <h2 id="reset-title" className="text-xl font-semibold mb-2">
          {t("header")}
        </h2>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      {/* Form - EXACT same styling as AuthForm */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-right-5">
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("fields.newPassword")}
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                onBlur={() => handleFieldBlur("newPassword")}
                className={cn(
                  "w-full pl-10 pr-12 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.newPassword ? "border-destructive" : "border-input"
                )}
                aria-describedby={
                  errors.newPassword ? "new-password-error" : undefined
                }
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
            {errors.newPassword && (
              <p
                id="new-password-error"
                className="text-destructive text-xs mt-1 flex items-center gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                {errors.newPassword}
              </p>
            )}
            <PasswordStrengthIndicator password={formData.newPassword} />
          </div>

          <div>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("fields.confirmPassword")}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                onBlur={() => handleFieldBlur("confirmPassword")}
                className={cn(
                  "w-full pl-10 pr-12 py-3 bg-muted/50 border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  errors.confirmPassword ? "border-destructive" : "border-input"
                )}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
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

          <button
            type="submit"
            disabled={isLoading || !token}
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
                <KeyRound className="h-5 w-5" />
              )}
              {t("button")}
            </span>
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => router.push("/auth")}
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              {t("backToLogin")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
