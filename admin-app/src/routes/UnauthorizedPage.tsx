// import GeneralFooter from "@/components/GeneralFooter";
import { Button } from "@/components/ui/button";

import { Link } from "react-router";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="flex flex-col items-center">
          <h1 className="mt-6 font-extrabold text-gray-900">
            Unauthorized Access
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Oops! It looks like you don't have permission to access this page.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Link to="/">
            <Button className="w-full">Login to continue</Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">{/* <GeneralFooter /> */}</div>
    </div>
  );
}
