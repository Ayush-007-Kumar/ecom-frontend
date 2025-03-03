import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

function AddressInfoModal({ open, setOpen, children }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-gray-600 opacity-60 " />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="relative w-full max-w-3xl mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl transition-all">
          <div className="flex justify-end gap-4 absolute right-4 top-2">
            <button onClick={() => setOpen(false)} type="button" className="bg-red-600 hover:bg-red-500 transition-colors duration-200 rounded-full p-2 ">
              <FaTimes className="text-slate-700" size={25} />
            </button>
          </div>

          <div className="py-6 px-6">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default AddressInfoModal;
