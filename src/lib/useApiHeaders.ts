import { useSession } from "next-auth/react";

const useApiHeaders = () => {
  const { data: session } = useSession();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const headers = new Headers();

  if (apiKey) {
    headers.set("x-api-key", apiKey);
  }

  if (session?.user?.token) {
    headers.set("Authorization", `Bearer ${session.user.token}`);
  }

  return headers;
};

export default useApiHeaders;
