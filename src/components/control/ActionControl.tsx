"use client";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { FormSubmit } from "./FormSubmit";
import { IActionModelo } from "@/interfaces/modelo";
import { action_modelo } from "@/action/modelo";
import { useRouter } from "next/navigation";

export const ActionControl = (props: IActionModelo) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<IActionModelo>({
    defaultValues: {
      version: props.version ?? "",
      platform: props.platform ?? "",
    },
  });

  const onSubmit = async (data: IActionModelo) => {
    const id = props.control == "add" ? "" : props.control;
    const propsData = {
      id,
      ...data,
      token: process.env.NEXT_PUBLIC_PATH_TOKEN,
      base: process.env.NEXT_PUBLIC_PATH_BASE,
    };

    const rest = await action_modelo(propsData);
    if (rest.ok) {
      console.log("enviado");
      router.push("control/");
    }
    router.back();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 space-y-6 sm:p-6 text-textSecondary">
          <h2 className="text-2xl font-bold uppercase">text</h2>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <FormInput
                name={"version"}
                name_process={"version"}
                type={"string"}
                register={register}
                msg_error={""}
                error_type={""}
                required={true}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <FormInput
                name={"platform"}
                name_process={"platform"}
                type={"string"}
                register={register}
                msg_error={""}
                error_type={""}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 px-4 sm:px-6">
          <FormSubmit
            path={"control/"}
            send={"enviar"}
            locale={"en"}
            back={"regresar"}
          />
        </div>
      </div>
    </form>
  );
};
