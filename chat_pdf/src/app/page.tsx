import { Footer } from "@/app/components/footer";
import { Logo } from "@/app/components/logo";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import DocumentUploadMain from "@/app/components/documentUploadMain";
import { redirect } from "next/navigation";

export default async function Home() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div
        className="absolute inset-0 min-h-[500px] flex items-center justify-center"
        style={{ backgroundColor: "#18181b" }}
      >
        <div className="relative flex flex-col gap-8 px-4 -mt-24">
          <Logo></Logo>
          <DocumentUploadMain />
          {/* <Search></Search> */}
          <Footer></Footer>
        </div>
      </div>
    </FormProvider>
  );
}
