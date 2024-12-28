import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wallet } from "lucide-react";

export const Auth = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="">
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="h-6 w-6" />
                <CardTitle className="text-2xl">WealthWise</CardTitle>
              </div>
              <CardDescription className="text-lg">
                Track expenses, set budgets, and achieve your financial goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <SignedOut>
                  <Button className="w-full" size="lg" asChild>
                    <SignUpButton mode="modal">Get Started</SignUpButton>
                  </Button>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className=" px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                  <p className="text-center">Already have an account?</p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <SignInButton mode="modal" signUpForceRedirectUrl={`/`} />
                  </Button>
                </SignedOut>
              </div>
            </CardContent>
          </Card>
          {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
        </div>
      </div>
    </div>
  );
};
