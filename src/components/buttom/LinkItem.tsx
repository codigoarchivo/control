'use client'

import { FC } from 'react';
import { useRouter } from 'next/navigation';

interface ILinkItem {
  link: string;
  locale: string;
  target?: '_self' | '_blank';
  className?: string;
  title: string;
  textOrSvg?: JSX.Element | string;
  svgLeft?: JSX.Element;
  svgRight?: JSX.Element;
  select?: boolean;
}

export const LinkItem: FC<ILinkItem> = (props) => {
  const router = useRouter(); // Inicializa useRouter

  const selectLang = (lo: string, de: string, li: string): string => {
    const selectedLocale = lo === de ? li : `/${lo}${li}`;
    return selectedLocale;
  };

  const { locale, link, target = '_self', select = true } = props;

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
   const selectedLink = select ? selectLang(locale, 'en', link) : link;
   router.push(selectedLink);
  };

  return (
    <a
      href={select ? selectLang(locale, 'en', link) : link}
      target={target}
      className={props.className}
      title={props?.title}
      onClick={handleClick} // Agrega el manejador de clic
    >
      {props.svgLeft} {props.textOrSvg} {props.svgRight}
    </a>
  );
};
