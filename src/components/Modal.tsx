import { createPortal } from "react-dom";
import React from "react";
import classNames from "classnames";
import { Cross1Icon } from "@radix-ui/react-icons";

const Modal = ({
  children,
  isOpen,
  onClose,
  title
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div
      className={classNames(
        `fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60`,
        {
          hidden: !isOpen
        }
      )}
      onClick={() => {
        onClose();
      }}
    >
      <div
        className={
          "max-w-full md:max-w-4xl min-w-[20rem] bg-black text-white p-6 shadow-2xl rounded-2xl relative border-neutral-700 border-2 pb-8 pt-14"
        }
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {title && (
          <div
            className={"text-2xl font-bold text-center absolute top-3 left-8"}
          >
            {title}
          </div>
        )}
        <Cross1Icon
          onClick={() => onClose()}
          className={"absolute top-4 right-4 cursor-pointer"}
        />
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
