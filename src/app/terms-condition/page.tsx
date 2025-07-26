import StaticContentPage from "@/components/StaticContentPage";

export const revalidate = 86400;

export default async function PrivacyPolicyPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(`${baseUrl}/api/setting-websites`, {
    headers: {
      "x-api-key": apiKey || "",
    },
    next: { revalidate },
  });

  const data = await res.json();

  const privacySetting = data.data.find(
    (s: any) => s.key === "terms_condition"
  );

  const content =
    privacySetting?.value || "<p>Terms Condition not available.</p>";

  return <StaticContentPage header="Terms Condition" content={content} />;
}
