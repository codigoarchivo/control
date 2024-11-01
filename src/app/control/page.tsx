export const revalidate = 0;

import { LinkItem } from "@/components/buttom/LinkItem";
import { THead } from "@/components/form/THead";
import { TBody } from "@/components/tbody/TBody";
import { getSome } from "@/lib/getSome";

export default async function Control() {
  const select = {
    token: process.env.NEXT_PUBLIC_PATH_TOKEN ?? "",
    params: "",
    base: process.env.NEXT_PUBLIC_PATH_BASE ?? "",
    id: "",
  };

  const control = await getSome(select);

  return (
    <div className="container mx-auto my-20 text-gray-500 min-h-screen sm:min-h-screen">
      <div className="relative overflow-x-auto">
        <div className="mb-5">
          <LinkItem
            title={"add"}
            link={`/control/add`}
            locale={"en"}
            textOrSvg={"add"}
            className='inline-block rounded-lg bg-primary px-3 py-1 shadow-custom1 text-center text-sm font-semibold text-textPrimary outline-none transition duration-500 ease-in-out transform hover:bg-secondary focus-visible:ring active:bg-secondary md:text-base'
          />
        </div>
        {control.ok && !!control.data[0] && (
          <table className="w-full text-sm text-left rtl:text-right shadow-custom1 mx-1 sm:mx-0">
            <THead data={["id", "version", "platform", "action"]} />
            <TBody control={control?.data} locale={"en"} />
          </table>
        )}
      </div>
    </div>
  );
}
