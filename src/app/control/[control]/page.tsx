export const revalidate = 0;

import { ActionControl } from "@/components/control/ActionControl";
import { IVersionInfo } from "@/interfaces/modelo";
import { getSome } from "@/lib/getSome";

interface IParams {
  control: string;
}
interface IData {
  params: IParams;
}

export default async function Control({ params }: IData) {
  const select = {
    token: process.env.NEXT_PUBLIC_PATH_TOKEN ?? "",
    params: "",
    base: process.env.NEXT_PUBLIC_PATH_BASE ?? "",
    id: params.control,
  };

  const networks = await getSome(select);

  const contacto = networks.data as IVersionInfo;
  return (
    <div suppressHydrationWarning={true} className="container mx-auto mt-10">
      <ActionControl
        id={contacto?.id ?? ''}
        version={contacto?.version}
        platform={contacto?.platform}
        control={params.control}
      />
    </div>
  );
}
