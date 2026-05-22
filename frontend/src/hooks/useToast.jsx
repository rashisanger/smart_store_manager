import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ToastContext =
    createContext();

export const ToastProvider = ({
    children,
}) => {
    const [toasts, setToasts] =
        useState([]);

    const addToast = (
        message,
        type = "success"
    ) => {
        const id = Date.now();

        setToasts((prev) => [
            ...prev,
            {
                id,
                message,
                type,
            },
        ]);
    };

    const removeToast = (id) => {
        setToasts((prev) =>
            prev.filter(
                (toast) => toast.id !== id
            )
        );
    };

    useEffect(() => {
        if (!toasts.length) return;

        const timers = toasts.map(
            (toast) =>
                setTimeout(() => {
                    removeToast(toast.id);
                }, 3000)
        );

        return () =>
            timers.forEach(clearTimeout);
    }, [toasts]);

    return (
        <ToastContext.Provider
            value={{
                toasts,
                addToast,
                removeToast,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () =>
    useContext(ToastContext);