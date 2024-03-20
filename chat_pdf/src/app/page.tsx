"use client";
import { Footer } from "@/app/components/footer";
import { Logo } from "@/app/components/logo";
import { PresetQuery } from "@/app/components/preset-query";
import { Search } from "@/app/components/search";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import ProductImagesTab from "@/app/components/uploadpdf";

export default function Home() {
  const methods = useForm(); // Initialize your form methods here

  return (
    <FormProvider {...methods}>
      {" "}
      {/* Wrap your components with FormProvider */}
      <div
        className="absolute inset-0 min-h-[500px] flex items-center justify-center"
        style={{ backgroundColor: "#18181b" }}
      >
        <div className="relative flex flex-col gap-8 px-4 -mt-24">
          <Logo></Logo>
          <ProductImagesTab></ProductImagesTab>
          {/* <Search></Search> */}
          {/* <div className="flex gap-2 flex-wrap justify-center">
            <PresetQuery query="Who said live long and prosper?"></PresetQuery>
            <PresetQuery query="What is the Higgs Boson and why should I care?"></PresetQuery>
          </div> */}
          <Footer></Footer>
        </div>
      </div>
    </FormProvider>
  );
}