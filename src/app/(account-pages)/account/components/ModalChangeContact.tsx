import React, { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import CustomPhoneInput from "@/shared/PhoneInput";
import FormOTP from "@/app/otp/form";
import { useRequestUpdateContactMutation } from "@/lib/services/authService";
import { toast } from "@/hooks/use-toast";
import { handleError } from "@/lib/handleApiError";
import { cn } from "@/lib/utils";

type Props = {
  type: "email" | "phone";
  closeModal: () => void;
};

type FormData = {
  email?: string;
  phone?: string;
};

export default function ModalChangeContact({ type, closeModal }: Props) {
  const [requestUpdateContact, { isLoading: isLoadingRequestUpdateContact }] = useRequestUpdateContactMutation();
  const [contactValue, setContactValue] = useState<string>("");

  const [showOTPModal, setShowOTPModal] = useState(false);
  const schema = useMemo(() => {
    return type === "email"
      ? yup.object({
          email: yup.string().email("Invalid email address").required("Email is required"),
        })
      : yup.object({
          phone: yup
            .string()
            .matches(/^[0-9]{10,15}$/, "Invalid phone number")
            .required("Phone number is required"),
        });
  }, [type]);

  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmitModal = async (data: FormData) => {
    try {
      const value = {
        type: type,
        user: type === "email" ? data.email : type === "phone" ? data.phone : "",
      };

      const res = await requestUpdateContact(value).unwrap();

      if (res.code === 200) {
        setShowOTPModal(true);
        setContactValue(type === "email" ? data.email || "" : data.phone || "");
        const message = type === "email" ? "Check your email for OTP" : "Check your WhatsApp for OTP";
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Success",
          description: message,
          variant: "success",
          duration: 5000,
        });
      } else {
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
          title: "Error",
          description: "Something Wrong, Try Again!",
          variant: "destructive",
          duration: 5000,
        });
      }
      form.reset();
    } catch (error: any) {
      form.reset();
      handleError(error);
    }
  };

  return (
    <>
      {!showOTPModal ? (
        <Form {...form}>
          <form className="max-w-4xl space-y-6">
            {type === "email" ? (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input className="mt-1.5" placeholder="Enter new email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <Label>Phone Number</Label>
                    <FormControl>
                      <CustomPhoneInput
                        type="text"
                        placeholder="Enter new phone number"
                        autoComplete="tel"
                        className="mt-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="pt-2">
              <ButtonPrimary
                type="submit"
                loading={isLoadingRequestUpdateContact}
                onClick={form.handleSubmit(onSubmitModal)}
                className="w-full"
              >
                Submit
              </ButtonPrimary>
            </div>
          </form>
        </Form>
      ) : (
        // Jika showOTPModal true, tampilkan FormOTP
        <FormOTP
          mode={type === "email" ? "change-email" : "change-phone"}
          contact={contactValue}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
