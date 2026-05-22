import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken =
            localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (userData, jwt) => {
        setUser(userData);

        setToken(jwt);

        localStorage.setItem("token", jwt);
    };

    const logout = () => {
        setUser(null);

        setToken(null);

        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext);