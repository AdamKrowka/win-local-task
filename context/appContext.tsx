import { createContext, ReactNode, useContext } from "react";

export interface AppContextWrapperProps {
  children: ReactNode;
}

export interface ContextValue {}

const defaultValue = {};

const AppContext = createContext(defaultValue);

export const AppContextWrapper = ({ children }: AppContextWrapperProps) => {
  const value: ContextValue = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
