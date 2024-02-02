import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <h1 className="text-3xl">Hello world</h1>
      <Link href={"/form"} className={buttonVariants({ variant: "default" })}>
        Go TO Form
      </Link>
    </main>
  );
}
