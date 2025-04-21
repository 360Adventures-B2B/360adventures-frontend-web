import { toast } from "@/hooks/use-toast";

export interface ErrorResponse {
  status: number;
  data: {
    code: number;
    status: string;
    message: string;
    errors: any;
    data: any;
  };
}

export function isErrorResponse(error: any): error is ErrorResponse {
  return (
    error &&
    typeof error.status === "number" &&
    error.data &&
    typeof error.data.code === "number" &&
    typeof error.data.message === "string"
  );
}
export function handleError(error: any, customMessage?: string): void {
  const customMessages: { [key: number]: string } = {
    401: "Oops! You are unauthorized. Please check your login credentials.",
    403: "Sorry, you do not have permission to access this resource.",
    404: "We could not find the page you are looking for.",
    500: "Something went wrong on the server. Please try again later.",
  };

  let errorMessage = customMessage;

  if (!errorMessage && isErrorResponse(error)) {
    if (error.data.code === 422 && error.data.errors) {
      errorMessage = error.data.errors.join(", "); 
    } else {
      errorMessage = error.data.message || customMessages[error.data.code] || "An unexpected error occurred.";
    }
  }

  if (!errorMessage) {
    errorMessage = "An unexpected error occurred.";
  }

  toast({
    className: "top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4",
    title: "Error",
    description: errorMessage,
    variant: "destructive",
    duration: 5000,
  });
}
