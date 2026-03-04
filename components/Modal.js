import React, { Fragment } from 'react'
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from "@headlessui/react";

function Modal() {
    const [open,setOpen]=useRecoilState(modalState);
  return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog as = 'div' className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
            <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h3 className="text-lg font-medium text-gray-900">Modal Title</h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">Modal content goes here.</p>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
            {/* {open && <p>I AM OPEN</p>} */}

    </Transition.Root>
    
  )
}

export default Modal