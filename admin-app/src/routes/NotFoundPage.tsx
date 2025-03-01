// import GeneralFooter from "@/components/GeneralFooter";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl xl:text-9xl font-extrabold text-gray-900">
            404
          </h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Page not found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">{/* <GeneralFooter /> */}</div>
    </div>
  );
}
