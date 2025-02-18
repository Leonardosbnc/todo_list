import React, { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface BaseModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleOpenStateChange: (v: boolean) => void;
}

export function ModalBackdrop({
  handleOpenStateChange,
  children,
}: {
  handleOpenStateChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/40 grid place-items-center z-[1000]"
      onClick={() => handleOpenStateChange(false)}
    >
      {children}
    </div>
  );
}

export function ModalContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative w-full max-w-xl max-h-[80vh] w-full p-8 bg-repeat bg-white shadow-modal overflow-auto rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

export default function BaseModal({
  isOpen,
  handleOpenStateChange,
  children,
}: BaseModalProps) {
  const element = document.querySelector("body");

  useEffect(() => {
    if (element) element.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen, element]);

  return (
    element &&
    isOpen &&
    createPortal(
      <ModalBackdrop handleOpenStateChange={handleOpenStateChange}>
        <ModalContainer>{children}</ModalContainer>
      </ModalBackdrop>,
      element
    )
  );
}
