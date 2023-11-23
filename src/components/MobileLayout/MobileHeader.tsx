import React, { Fragment } from 'react';
// To reactivate the hardware page the line above should be replaced by this:
// import { faDesktopAlt, faMicrochip, faBars } from '@fortawesome/pro-regular-svg-icons';
import { Popover, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import menus from './helpers';

interface MenuIcons {
  deploy: React.ReactElement;
  hardware: React.ReactElement;
}

export default function MobileHeader() {
  const router = useRouter();

  const menuIcons: MenuIcons = {
    deploy: (
      <i className="fa-regular fa-desktop absolute pl-[0.2rem] pr-2 text-xl text-stk-green" />
    ),
    hardware: (
      <i className="fa-regular fa-microchip absolute pl-[0.25rem] pr-2 text-xl text-stk-green" />
    ),
  };

  return (
    <Popover className="relative bg-stk-blue-200 py-2">
      <div className="flex items-center justify-between px-5 ">
        <div className="flex items-center space-x-3">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/deploy">
              <a className="relative h-8 w-8">
                <Image src="/assets/stackos-icon.svg" layout="fill" alt="stack logo" />
              </a>
            </Link>
          </div>
          <span className="text-base font-light text-stk-green">
            {router.pathname.includes('deploy') ? 'Dashboard View' : 'Resources Usage'}
          </span>
        </div>
        <div className="">
          <Popover.Button className="inline-flex items-center justify-center rounded-md p-2">
            <i className="fa-solid fa-bars text-2xl text-stk-green" />
          </Popover.Button>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-50 w-full origin-top-right p-2 transition"
        >
          <div className="z-10 divide-y-[2px] divide-[#1d2231] rounded-lg bg-stk-blue-300 shadow-lg">
            <div className="flex items-center justify-between px-5 py-4 outline-none">
              <Link href="/deploy">
                <a className="relative h-8 w-8 outline-none">
                  <Image src="/assets/stackos-icon.svg" layout="fill" alt="stack logo" />
                </a>
              </Link>
              <div className="-mr-2">
                <Popover.Button className="z-10 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mx-5 pt-2 pb-5">
              <div className="flex flex-col text-lg text-white">
                {menus.map((item) => (
                  <Link key={item.id} href={item.href} passHref>
                    <div className="relative flex cursor-pointer items-center rounded-md py-2">
                      {menuIcons[item.icon as keyof MenuIcons]}
                      <a className="ml-10">{item.name}</a>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
