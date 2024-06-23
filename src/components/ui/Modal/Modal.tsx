import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useLoading } from '@/contexts/loading'
import { ModalProps } from '@/types'
import { cn } from '@/lib/utils'

const Modal = (props: ModalProps) => {
  const { show, close, children, afterLeave = () => {}, className } = props
  const cancelButtonRef = useRef(null)
  const { loading } = useLoading()

  return (
    <Transition appear show={show} as={Fragment} afterLeave={afterLeave}>
      <Dialog
        as="div"
        initialFocus={cancelButtonRef}
        className="relative !z-[1000]"
        onClose={() => !loading && close()}
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto" ref={cancelButtonRef}>
          <div className="flex min-h-full items-center justify-center px-4 py-4 text-center sm:px-10 md:px-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'h-full w-full max-w-xl transform rounded bg-secondary p-8 py-10 text-left align-middle shadow-lg transition-all md:px-10',
                  className,
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
