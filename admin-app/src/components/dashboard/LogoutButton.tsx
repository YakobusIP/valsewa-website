import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

import { toast } from "@/hooks/useToast";

import { Loader2Icon, LogOutIcon } from "lucide-react";

export default function LogoutButton() {
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    setIsLoadingLogout(true);

    try {
      await logout();
      toast({
        title: "All set!",
        description: "Logged out successfully"
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
    <Button variant="destructive" onClick={handleLogout}>
      {isLoadingLogout ? (
        <Loader2Icon className="w-4 h-4 animate-spin" />
      ) : (
        <LogOutIcon className="w-4 h-4" />
      )}
      Logout
    </Button>
  );
}
