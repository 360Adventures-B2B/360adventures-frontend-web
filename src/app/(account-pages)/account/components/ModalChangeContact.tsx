import React, { useMemo, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import CustomPhoneInput from "@/shared/PhoneInput";
import { log } from "console";
import FormOTP from "@/app/otp/form";

type Props = {
  type: "email" | "phone";
  closeModal: () => void;
};

type FormData = {
  email?: string;
  phone?: string;
};

export default function ModalChangeContact({ type, closeModal }: Props) {
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
      console.log("Form submitted:", data);
      setShowOTPModal(true);
      //   closeModal(); // Tutup modal setelah berhasil submit
    } catch (err: any) {
      console.error("Error during form submission:", err);
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
                type="button" // type="button" agar tidak submit form utama
                onClick={form.handleSubmit(onSubmitModal)} // Ketika klik tombol, submit modal
                className="w-full"
              >
                Submit
              </ButtonPrimary>
            </div>
          </form>
        </Form>
      ) : (
        // Jika showOTPModal true, tampilkan FormOTP
        <FormOTP closeModal={() => setShowOTPModal(false)} />
      )}
    </>
  );
}
