import { headers } from "next/headers";

export const getBaseUrl = async () => {
  const host = (await headers()).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return baseUrl;
};
