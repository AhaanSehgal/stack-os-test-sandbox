import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import sideMenuItens from './helpers/index';

interface MenuIcons {
  deploy: React.ReactElement;
  hardware: React.ReactElement;
  appStore: React.ReactElement;
  role: React.ReactElement;
}

interface Props {
  selectedNft: string;
}

const SideMenu = ({ selectedNft }: Props) => {
  const router = useRouter();

  const basePathPattern = /\/[^/]*/;

  const menuIcons: MenuIcons = {
    deploy: <i className="fa-solid fa-desktop text-xl" />,
    hardware: <i className="fa-solid fa-microchip text-xl" />,
    appStore: <i className="fa-solid fa-store text-xl" />,
    role: <i className="fa-solid fa-chalkboard-user text-xl" />,
  };

  return (
    <div className="relative z-50 w-[3.125rem]">
      <div className="fixed h-screen w-[3.125rem] bg-stk-blue-200">
        <Link href="/deploy">
          <a className="flex h-[4.25rem] items-center justify-center border-r-[0.5px] border-[#2D374B]">
            <Image alt="stackos-icon" src="/stackos-icon.svg" width={22} height={22} />
          </a>
        </Link>
        {sideMenuItens.map((item) => {
          if (item.name === 'role' && !selectedNft) {
            return '';
          }
          // TODO: Temporarily disabling appstore, later remove below condition completely
          if (item.name === 'appStore') {
            return (
              <a
                data-tip={item.title}
                data-for="menus"
                className={`flex h-[4.3rem] items-center justify-center border-t-[0.5px] border-[#2D374B] duration-300 ${
                  item.href === router.pathname.match(basePathPattern)?.[0]
                    ? 'text-stk-green'
                    : 'text-stk-white'
                } opacity-40`}
              >
                {menuIcons[item.name as keyof MenuIcons]}
              </a>
            );
          }
          return (
            <Link href={item.href} key={item.id}>
              <a
                data-tip={item.title}
                data-for="menus"
                className={`flex h-[4.3rem] items-center justify-center border-t-[0.5px] border-[#2D374B] duration-300 hover:bg-stk-blue-100 ${
                  item.href === router.pathname.match(basePathPattern)?.[0]
                    ? 'text-stk-green'
                    : 'text-stk-white'
                }`}
              >
                {menuIcons[item.name as keyof MenuIcons]}
              </a>
            </Link>
          );
        })}
        <ReactTooltip
          id="menus"
          place="right"
          effect="solid"
          backgroundColor="#DFDFDF"
          textColor="#1F2937"
          className="text-xs font-medium"
        />
      </div>
    </div>
  );
};

export default SideMenu;
