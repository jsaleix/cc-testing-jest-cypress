import { createContext, useContext } from "react";
import helpers from "../services/helpers";

export const appInitData = {
    isLoggedIn: helpers.getToken() ? true : false
}
export const AppContext = createContext(appInitData);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => {
    const context = useContext(AppContext);

    if(context === undefined){
        throw new Error('Missing App Context Provider');
    }

    return context;
}
