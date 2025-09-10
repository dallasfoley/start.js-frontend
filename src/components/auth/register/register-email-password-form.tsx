"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerWithEmailPassword } from "@/server/actions/auth/register/registerWithEmailPassword";
import { toast } from "sonner";
import { useState } from "react";
import { LoginFormData, loginFormSchema } from "@/types";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterEmailPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await registerWithEmailPassword(formData);
      if (!res.success) {
        setLoading(false);
        console.log(res.message);
        toast(res.message);
      } else {
        setLoading(false);
        setError(res.message);
        console.log(res.message);
        toast(res.message);
        router.push("/dashboard");
      }
    } catch (e) {
      setLoading(false);
      setError("Something went wrong. Try Again.");
      console.error(e);
      toast(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {error.length > 0 && error}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label className="text-lg">Email</Label>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label className="text-lg">Password</Label>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2Icon /> : "Sign-Up"}
        </Button>
      </form>
    </Form>
  );
}
