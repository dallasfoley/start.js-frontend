import RegisterEmailPasswordForm from "@/components/auth/register/register-email-password-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { registerWithGithub } from "@/server/actions/auth/register/registerWithGithub";
import { registerWithGoogle } from "@/server/actions/auth/register/registerWithGoogle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RegisterPage() {
  return (
    <Card className="flex flex-col w-full max-w-md mx-auto my-16 p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-semibold">
          Sign-Up
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="email-password">
            <AccordionTrigger className="text-left text-xl">
              Email & Password
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <RegisterEmailPasswordForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="text-center text-sm text-muted-foreground my-2">OR</div>
        <Button formAction={registerWithGithub}>
          Sign-Up with Github <FaGithub />
        </Button>
        <Button formAction={registerWithGoogle}>
          Sign-Up with Google <FaGoogle />
        </Button>
      </CardContent>
    </Card>
  );
}
