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
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/context/AuthContext";
import { useLazyValidateUserOtpQuery, useResendUserOtpMutation } from "@/lib/services/authService";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import useSweetAlert from "@/hooks/useSweetAlert";

export default function FormOTP() {
  const { data: session } = useSession();

  const schema = yup.object().shape({
    otp: yup
      .string()
      .length(6, "OTP must be 6 digits")
      .matches(/^\d{6}$/, "OTP must contain only numbers")
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

  const [trigger, { isLoading }] = useLazyValidateUserOtpQuery();

  const [resendUserOtp, { isLoading: isLoadingResendOTP }] = useResendUserOtpMutation();

  const { showLoading, close } = useSweetAlert();

  async function onSubmit(formData: FormData) {
    try {
      const res = await trigger({ token: session?.user?.token, otpCode: formData.otp }).unwrap();
      if (res.code === 200) {
        await updateIsVerify(true);
        router.push("/");
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
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">OTP Code</span>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Enter OTP Code" autoComplete="otp" className="mt-1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </label>
          <ButtonPrimary loading={isLoading} type="submit" disabled={isResendDisabled}>
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
