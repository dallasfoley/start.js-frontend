import LoginEmailPasswordForm from "@/components/auth/login/login-email-password-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { loginWithGithub } from "@/server/actions/auth/login/loginWithGithub";
import { loginWithGoogle } from "@/server/actions/auth/login/loginWithGoogle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LoginPage() {
  return (
    <Card className="flex flex-col w-full max-w-md mx-auto my-16 p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-semibold">
          Sign-In
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="email-password">
            <AccordionTrigger className="text-left text-xl">
              Email & Password
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <LoginEmailPasswordForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="text-center text-sm text-muted-foreground my-2">OR</div>
        <Button formAction={loginWithGithub}>
          Sign-In with Github <FaGithub />
        </Button>
        <Button formAction={loginWithGoogle}>
          Sign-In with Google <FaGoogle />
        </Button>
      </CardContent>
    </Card>
  );
}
