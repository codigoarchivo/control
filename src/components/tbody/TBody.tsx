import { IVersionInfo } from '@/interfaces/modelo';
import { TbodyControl } from './TbodyControl';


interface ITBody {
  control: IVersionInfo[];
  locale: string;
}

export const TBody = async (props: ITBody) => {

  return props.control?.map((data: IVersionInfo) => (
    <TbodyControl locale={props.locale} key={data.id} data={data} />
  ));
};
