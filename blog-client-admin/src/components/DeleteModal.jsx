const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
            <div 
                className="fixed inset-0 bg-black/10" 
                onClick={onClose} 
            />
            
            <div className="relative bg-white rounded-xs shadow-xs max-w-md w-full p-4">
                <div className="flex flex-col items-center text-center">                    

                    <p className="text-gray-600 mt-3">
                        Are you sure you want to delete &nbsp;
                        <span className="font-bold text-gray-900">
                            "{title}"
                        </span>?
                    </p>
                </div>

                <div className="mt-10 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-1 border border-black rounded-xs hover:opacity-60 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-1 bg-black rounded-xs text-white hover:opacity-80 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;