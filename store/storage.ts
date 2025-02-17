import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        // added __ before key to pass linting test during build
        // added ignore unused var with __ to eslint config
        getItem(__key: unknown) {
            return Promise.resolve(null);
        },
        setItem(__key: unknown, __value: unknown) {
            return Promise.resolve(__value);
        },
        removeItem(__key: unknown) {
            return Promise.resolve();
        },
    };
};
//in ssr (window !== "undefined"), createNoopStorage will be reached, else local storage
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
