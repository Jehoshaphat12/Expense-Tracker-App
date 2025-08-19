import { IoMdClose } from "react-icons/io";

// Resusable Component
export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-black/60 px-3 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-50 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold ">{title}</h2>
        <button onClick={onClose} className="cursor-pointer"><IoMdClose size={25}/></button>
        </div>
        {children}
        <div className="flex justify-end mt-4">
          {/* <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
}