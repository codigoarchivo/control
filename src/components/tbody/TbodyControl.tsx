import { IVersionInfo } from "@/interfaces/modelo";
import { LinkItem } from "../buttom/LinkItem";
import { ModalDelete } from "../modal/ModalDelete";

interface ITbodyAdminPayment {
  locale: string;
  data: IVersionInfo;
}

export const TbodyControl = async (props: ITbodyAdminPayment) => {
  return (
    <tbody>
      <tr className="bg-white border-b  hover:bg-gray-50 ">
        <td className="px-6 py-2 truncate">{props.data.id}</td>
        <td className="px-6 py-2 truncate">{props.data.version}</td>
        <td className="px-6 py-2 truncate">{props.data.platform}</td>
        <td className="px-6 py-2">
          <div className="flex gap-2 items-center">
            <LinkItem
              title={"edit"}
              link={`/control/${props.data.id}`}
              locale={"en"}
              textOrSvg={"edit"}
              className="inline-block rounded-lg bg-primary px-3 py-1 shadow-custom1 text-center text-sm font-semibold text-textPrimary outline-none transition duration-500 ease-in-out transform hover:bg-secondary focus-visible:ring active:bg-secondary md:text-base"
            />
            {/* modal delete */}
            <ModalDelete
              link={`${process.env.NEXT_PUBLIC_PATH_BASE}/${props.data.id}`}
              back="/control"
              del={'Eliminar'}
              text={'Desea Eliminar'}
              cancel={'Cerrar'}
            />
          </div>
        </td>
      </tr>
    </tbody>
  );
};
