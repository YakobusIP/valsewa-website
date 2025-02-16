import { useState } from "react";

import { authService } from "@/services/auth.service";

import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/useToast";

import { setAccessToken } from "@/lib/axios";

import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function LogoutButton() {
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoadingLogout(true);

    try {
      const response = await authService.logout();
      setAccessToken(null);
      navigate("/");
      toast({
        title: "All set!",
        description: response.message
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingLogout(false);
    }
  };

  return (
    <Button
      variant="destructive"
      className="absolute top-4 right-4"
      onClick={handleLogout}
    >
      {isLoadingLogout ? (
        <Loader2Icon className="w-4 h-4 animate-spin" />
      ) : (
        <LogOutIcon className="w-4 h-4" />
      )}
      Logout
    </Button>
  );
}
