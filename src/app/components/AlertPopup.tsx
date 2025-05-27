'use client';


type AlertPopupProps = {
  message: string;
  onClose: () => void;
};

export default function AlertPopup({ message, onClose }: AlertPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm">
        <p className="mb-4">{message}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
