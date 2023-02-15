import { useUsersQuery } from "@/api/endpoints";
import { User } from "@/types/api.types";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AppContextWrapperProps {
  children: ReactNode;
}

export interface ContextValue {
  users: User[] | undefined;
  currentUser: User | undefined;
}

const defaultValue = {
  users: [],
  currentUser: undefined,
};

const AppContext = createContext<ContextValue>(defaultValue);

export const AppContextWrapper = ({ children }: AppContextWrapperProps) => {
  const router = useRouter();
  const { data: users } = useUsersQuery();
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const currentUserId = router.query.id;
    if (!users || !currentUserId) {
      setCurrentUser(undefined);
      return;
    }
    const userById = users.find((user) => user.id === Number(currentUserId));
    if (!userById) {
      setCurrentUser(undefined);
      return;
    }
    setCurrentUser(userById);
  }, [router, users]);

  const value: ContextValue = {
    users,
    currentUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
