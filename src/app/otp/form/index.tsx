"use client";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { redirect, useRouter } from "next/navigation";
import { handleError } from "@/lib/handleApiError";
import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/context/AuthContext";
import { useLazyValidateUserOtpQuery, useResendUserOtpMutation } from "@/lib/services/authService";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useSweetAlert from "@/hooks/useSweetAlert";
import { useForgotPassword } from "@/context/ForgotPasswordContext";

export default function FormOTP({ mode }: { mode: "register" | "reset-password" }) {
  const { token: tokenForgotPassword } = useForgotPassword();

  const { data: session } = useSession();

  const schema = yup.object().shape({
    otp: yup
      .string()
      .length(4, "OTP must be 4 digits")
      .matches(/^\d{4}$/, "OTP must contain only numbers")
      .required("OTP is required"),
  });

  type FormData = yup.InferType<typeof schema>;

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: "",
    },
  });

  const router = useRouter();

  const { updateIsVerify } = useAuth();

  const [trigger, { isLoading, isFetching }] = useLazyValidateUserOtpQuery();

  const [resendUserOtp, { isLoading: isLoadingResendOTP }] = useResendUserOtpMutation();

  const { showLoading, close } = useSweetAlert();

  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function onSubmit(formData: FormData) {
    try {
      const params =
        mode === "reset-password"
          ? {
              token: tokenForgotPassword,
              otpCode: formData.otp,
              is_reset_password: true,
            }
          : {
              token: session?.user?.token,
              otpCode: formData.otp,
            };

      const res = await trigger(params).unwrap();

      if (res.code === 200) {
        if (mode === "reset-password") {
          window.location.href = `/reset-password?token=${tokenForgotPassword}&otp=${formData.otp}`;
        } else {
          await updateIsVerify(true);
          window.location.href = "/";
        }
      }
    } catch (error: any) {
      handleError(error);
    }
  }

  const [isInitialized, setIsInitialized] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedExpireTime = localStorage.getItem("otpExpireTime");
      const currentTime = Date.now();

      if (savedExpireTime) {
        const timeLeft = Math.max(Math.floor((parseInt(savedExpireTime, 10) - currentTime) / 1000), 0);
        setSecondsLeft(timeLeft);
        setIsResendDisabled(timeLeft > 0);
      }

      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized || secondsLeft === 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          setIsResendDisabled(false);
          localStorage.removeItem("otpExpireTime");
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, isInitialized]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (otp.some((val) => val === "")) {
      setIsSubmitted(false);
    }

    if (!isSubmitted && otp.every((val) => val !== "") && otp.join("").length === 4) {
      setIsSubmitted(true);
      form.handleSubmit(onSubmit)();
    }
  }, [otp, form, onSubmit, isSubmitted]);

  const handleResend = async () => {
    try {
      showLoading("please wait..");
      const res = await resendUserOtp(undefined).unwrap();

      if (res.code === 200) {
        const newExpireTime = Date.now() + 60000;
        localStorage.setItem("otpExpireTime", newExpireTime.toString());
        setSecondsLeft(60);
        setIsResendDisabled(true);
      } else {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Something Wrong, Try Again!",
          variant: "destructive",
          duration: 5000,
        });
      }
      close();
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      form.setValue("otp", newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner type="long" className="mr-2 mt-10 h-10 w-10 animate-spin text-primary-700" />
      </div>
    );
  }
  return (
    <>
      <Form {...form}>
        <form className="grid grid-cols-1 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <span className="text-neutral-800 dark:text-neutral-200 text-center">
              {mode === "register"
                ? "We sent a verification code to your email. Kindly check and enter it below."
                : "Enter the OTP code sent to you to reset your password."}
            </span>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border border-primary-6000 rounded-lg text-center text-xl focus:outline-none focus:border-transparent focus:ring-2 focus:ring-primary-500"
              />
            ))}
          </div>

          <ButtonPrimary
            loading={isLoading || isFetching}
            type="submit"
            disabled={isLoading}
          >
            Validate
          </ButtonPrimary>
        </form>
      </Form>
      <span className="block text-center text-neutral-700 dark:text-neutral-300">
        have not received the code? {` `}
        <Link
          href="#"
          className={`font-semibold underline ${isResendDisabled ? "text-gray-500" : "text-blue-600"}`}
          onClick={(e) => {
            e.preventDefault();
            if (!isResendDisabled) handleResend();
          }}
          style={{ pointerEvents: isResendDisabled ? "none" : "auto" }}
        >
          {isResendDisabled ? `Resend in ${secondsLeft}s` : "Resend"}
        </Link>
      </span>
    </>
  );
}
