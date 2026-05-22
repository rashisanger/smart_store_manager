import { useToast } from "../hooks/useToast";

const Toast = () => {
    const { toasts, removeToast } =
        useToast();

    const toastStyles = {
        success:
            "bg-green-600 text-white",
        error: "bg-red-600 text-white",
        info: "bg-blue-600 text-white",
        warning:
            "bg-yellow-500 text-white",
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`min-w-[260px] flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium transform transition-all duration-300 animate-slideIn ${toastStyles[toast.type]}`}
                >
                    <span>{toast.message}</span>

                    <button
                        onClick={() =>
                            removeToast(toast.id)
                        }
                        className="text-white/80 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;