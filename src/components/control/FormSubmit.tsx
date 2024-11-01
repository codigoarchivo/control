"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface IFormSubmit {
  send: string;
  locale: string;
  back: string;
  path: string;
}

export const FormSubmit = (props: IFormSubmit) => {
  const router = useRouter();
  return (
    <>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-custom1 text-sm font-medium rounded-md text-textPrimary bg-primary hover:bg-secondary transition duration-500 ease-in-out transform"
      >
        {props.send}
      </button>
      <button
        type="button"
        onClick={() => {
          router.push("/control");
        }}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-custom1 text-sm font-medium rounded-md text-textPrimary bg-primary hover:bg-secondary transition duration-500 ease-in-out transform"
      >
        {props.back}
      </button>
    </>
  );
};
