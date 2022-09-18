import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { Router, useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../../firebase";

interface IAuth {
  user: User | null;
  singUp: (email: string, password: string) => Promise<void>;
  singIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}
const AuthContext = createContext<IAuth>({
  user: null,
  singUp: async () => {},
  singIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}
// customized hook to Authentication & Context
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [error, setError] = useState(null);

  // to ensure that our user data persist after any refresh we should use this useEffect
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //Logged In
          setUser(user);
          setLoading(false);
        } else {
          //not Logged In
          setUser(null);
          setLoading(true);
          router.push("/login");
        }
        setInitialLoading(false);
      }),
    [auth]
  );

  // la fonction de singUp
  const singUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  //la fonction de singIn
  const singIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };
  //la fonction de Logout
  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then((userCredential) => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      singIn,
      singUp,
      loading,
      logout,
      error,
    }),
    [user, loading]
  );
  return (
    //pass the memoed value through the context provider
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  // the customized hook use the contex
  return useContext(AuthContext);
}
