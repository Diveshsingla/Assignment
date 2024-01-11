/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import { ReactNode, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export type JoineeContextProp = {
  children: ReactNode;
};

export type Joinee = {
  name: string;
  email: string;
  uuid: string;
};

export type FormState = {
  name: string;
  email: string;
};

export type joineContext = {
  storedJoineeList: Joinee[];
  handleJoin: (task: FormState) => void;
  handleDeleteJoinee: (name: string) => void;
  handleEditJoinee: (index: number, name: string, email: string) => void;
  handleReorderJoinee: (sourceIdx: number, destinationIdx: number) => void;
};

export const JoineeContext = createContext<joineContext | null>(null);

export const JoineeProvider = ({ children }: JoineeContextProp) => {
  const [storedJoineeList, setStoredJoineeList] = useState<Joinee[]>(() => {
    try {
      const newList = localStorage.getItem("JoineeList") || "[]";
      return JSON.parse(newList) as Joinee[];
    } catch (error) {
      return [];
    }
  });

  const handleJoin = (task: FormState) => {
    // Validate name and email
    if (task.name && task.email) {
      // Generate unique hex code
      const newHexCode: string = uuidv4().replace(/-/g, "").slice(0, 16);
      // Update Joinee state
      setStoredJoineeList(() => {
        const newJoineeList: Joinee[] = [
          { name: task.name, email: task.email, uuid: newHexCode },
          ...storedJoineeList,
        ];
        localStorage.setItem("JoineeList", JSON.stringify(newJoineeList));
        return newJoineeList;
      });
    }
  };

  const handleDeleteJoinee = (name: string) => {
    setStoredJoineeList((prev) => {
      const newJoineeList = prev.filter((Joine) => Joine.name !== name);
      localStorage.setItem("JoineeList", JSON.stringify(newJoineeList));
      return newJoineeList;
    });
  };

  const handleEditJoinee = (index: number, name: string, email: string) => {
    setStoredJoineeList((prev) => {
      const newJoineeList = [...prev];
      newJoineeList[index].name = name;
      newJoineeList[index].email = email;
      localStorage.setItem("JoineeList", JSON.stringify(newJoineeList));
      return newJoineeList;
    });
  };

  const handleReorderJoinee = (srcIdx: number, destIdx: number) => {
    setStoredJoineeList(() => {
      const reorderedJoinees = [...storedJoineeList];
      const [removed] = reorderedJoinees.splice(srcIdx, 1);
      reorderedJoinees.splice(destIdx, 0, removed);
      localStorage.setItem("JoineeList", JSON.stringify(reorderedJoinees));
      return reorderedJoinees;
    });
  };

  return (
    <JoineeContext.Provider
      value={{
        storedJoineeList,
        handleJoin,
        handleDeleteJoinee,
        handleEditJoinee,
        handleReorderJoinee,
      }}
    >
      {children}
    </JoineeContext.Provider>
  );
};

export const useStoredJoineeList = () => {
  const joineeListConsumer = useContext(JoineeContext);
  if (!joineeListConsumer) {
    throw new Error("useStoredJoineeList used outside of Provider");
  }
  return joineeListConsumer;
};

export default JoineeProvider;
