import { notFound } from "next/navigation";

/** Any unknown address inside a locale gets the designed 404 with status 404. */
export default function CatchAll() {
  notFound();
}
