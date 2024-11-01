"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { delete_modal } from "@/action/delete_modal";

interface IModalDelete {
  back: string;
  del: string;
  text: string;
  cancel: string;
  link: string;
}

export const ModalDelete = (props: IModalDelete) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("token", process.env.NEXT_PUBLIC_PATH_TOKEN ?? "");
    formData.append("path", props.link ?? "");

    const resp = await delete_modal(Object.fromEntries(formData));

    if (!resp?.ok) {
      console.log("No eliminado");
      return;
    }

    router.push("control/");
    router.refresh();
    setIsOpenDelete(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpenDelete(!isOpenDelete)}
        className="inline-block rounded-lg bg-primary px-3 py-1 shadow-custom1 text-center text-sm font-semibold text-textPrimary outline-none transition duration-500 ease-in-out transform hover:bg-secondary focus-visible:ring active:bg-secondary md:text-base"
      >
        {props.del}
      </button>
      {isOpenDelete && (
        <div
          className="relative z-30"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-25 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-custom1 transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <h3 className="text-2xl text-center py-5">{props.text}</h3>
                <div className="flex gap-5 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <form onSubmit={handleDelete}>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-custom1 text-sm font-medium rounded-md text-textPrimary bg-primary hover:bg-secondary transition duration-500 ease-in-out transform"
                    >
                      {props.del}
                    </button>
                  </form>
                  <button
                    onClick={() => setIsOpenDelete(!isOpenDelete)}
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-custom1 text-sm font-medium rounded-md text-textSecondary bg-white hover:bg-secondary hover:text-textPrimary transition duration-500 ease-in-out transform"
                  >
                    {props.cancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
