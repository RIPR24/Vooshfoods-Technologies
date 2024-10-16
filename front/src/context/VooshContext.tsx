import { createContext, useState } from "react";
import { card } from "../Tasks";

type props = {
  children: JSX.Element;
};

type user = {
  name: string;
  email: string;
  avatar: string;
  token: string;
} | null;

type mngtsk = {
  stat: boolean;
  obj: card | null;
};

type contexttype = {
  user: user | null;
  setUser: React.Dispatch<React.SetStateAction<user>> | null;
  setMngtsk: React.Dispatch<React.SetStateAction<mngtsk>> | null;
  setDespop: React.Dispatch<React.SetStateAction<mngtsk>> | null;
  apiurl: string | undefined;
  mngtsk: mngtsk;
  despop: mngtsk;
};

export const VooshContext = createContext<contexttype>({
  user: null,
  setUser: null,
  apiurl: undefined,
  mngtsk: {
    stat: false,
    obj: null,
  },
  despop: {
    stat: false,
    obj: null,
  },
  setMngtsk: null,
  setDespop: null,
});

const VooshContextProvider = ({ children }: props) => {
  const [user, setUser] = useState<user>(null);
  const [mngtsk, setMngtsk] = useState<mngtsk>({
    stat: false,
    obj: null,
  });
  const [despop, setDespop] = useState<mngtsk>({
    stat: false,
    obj: null,
  });
  const apiurl = "http://localhost:8000";

  return (
    <VooshContext.Provider
      value={{ user, setUser, apiurl, mngtsk, setMngtsk, setDespop, despop }}
    >
      {children}
    </VooshContext.Provider>
  );
};

export default VooshContextProvider;
