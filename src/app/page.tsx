import { buttonVariants } from "@/components/ui/button";
import { AllData } from "@/components/all-data";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <h1 className="text-3xl">Hello world</h1>
      <Link href={"/form"} className={buttonVariants({ variant: "default" })}>
        Go to Form
      </Link>
      <Link
        href={"/uploadthing"}
        className={buttonVariants({ variant: "default" })}
      >
        Go to Uploadthing
      </Link>

      <Link
        href={"/upload-button"}
        className={buttonVariants({ variant: "default" })}
      >
        Go to UploadButton
      </Link>
      <Link
        href={"/upload-dnd"}
        className={buttonVariants({ variant: "default" })}
      >
        Go to upload dnd
      </Link>
      <div>
        <AllData />
      </div>
    </main>
  );
}
