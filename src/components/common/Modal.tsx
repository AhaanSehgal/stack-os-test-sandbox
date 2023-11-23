import { Fragment, ReactNode, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface Props {
  showModal: boolean;
  bgColor?: string;
  onCloseModal?: () => void;
  children?: ReactNode;
  closeButton?: boolean;
  dataCy?: string | number;
  clickOutsideClose?: boolean;
}

const Modal = ({
  showModal,
  bgColor,
  onCloseModal = () => null,
  children,
  closeButton,
  dataCy,
  clickOutsideClose = true,
}: Props) => {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        data-cy={dataCy}
        className="relative z-50"
        onClose={() => clickOutsideClose && onCloseModal()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#000000A6]/75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                style={{ backgroundColor: bgColor || '#1F2937' }}
                className="relative rounded-lg p-[1.75rem] text-left shadow-xl transition-all"
              >
                {closeButton && (
                  <div
                    className="absolute top-[1.3rem] right-[1.3rem] cursor-pointer"
                    onClick={() => onCloseModal()}
                  >
                    <i className="fa-solid fa-xmark text-xl text-stk-grey-400" />
                  </div>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
