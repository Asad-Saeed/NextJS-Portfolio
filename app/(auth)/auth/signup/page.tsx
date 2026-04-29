import { notFound } from "next/navigation";

// Single-tenant mode: public signup is disabled.
export default function SignupPage(): never {
  notFound();
}
