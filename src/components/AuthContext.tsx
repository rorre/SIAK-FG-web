import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSX,
  Setter,
} from "solid-js";
import { useNavigate } from "solid-start";
import { Cookie } from "solid-start/session/cookies";
import { CookieData, ServerResponse, UserInfo } from "~/types";

interface Auth {
  authenticated: Accessor<boolean>;
  user: Accessor<UserInfo | null>;
  setAuthenticated: Setter<boolean>;
  login: (
    username: string,
    password: string
  ) => Promise<ServerResponse<CookieData>>;
  wrappedFetch: (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => Promise<Response>;
}

export const AuthContext = createContext<Auth>({} as Auth);

interface AuthContextProviderProps {
  children: JSX.Element;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [cookies, setCookies] = createSignal<CookieData>({
    siakng_cc: "",
    mojavi: "",
  });
  const [authenticated, setAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal<UserInfo | null>(null);

  const navigate = useNavigate();

  function wrappedFetch(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) {
    const cookie = cookies();
    return fetch(input, {
      ...init,
      mode: "cors",
      credentials: "include",
      headers: {
        ...init?.headers,
        "X-Mojavi": cookie.mojavi,
        "X-Siakng-Cc": cookie.siakng_cc,
      },
    });
  }

  async function login(username: string, password: string) {
    const response = await wrappedFetch(
      `${import.meta.env.VITE_API_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const res: ServerResponse<CookieData> = await response.json();
    if (res.status == 200) {
      setAuthenticated(true);
      sessionStorage.setItem("siakng_cc", res.data.siakng_cc);
      sessionStorage.setItem("mojavi", res.data.mojavi);
      setCookies(res.data);
    }

    return res;
  }

  async function getMe() {
    const response = await wrappedFetch(`${import.meta.env.VITE_API_URL}/me`);
    const res: ServerResponse<UserInfo> = await response.json();

    if (res.status == 200) {
      setAuthenticated(true);
      setUser(res.data);
      navigate("/");
    } else {
      setAuthenticated(false);
      setUser(null);
      navigate("/auth");
    }
  }

  createEffect(async () => {
    if (!authenticated()) return;
    await getMe();
  });

  createEffect(async () => {
    const siakCookie = sessionStorage.getItem("siakng_cc");
    const mojaviCookie = sessionStorage.getItem("mojavi");
    if (siakCookie && mojaviCookie) {
      setCookies({
        siakng_cc: siakCookie,
        mojavi: mojaviCookie,
      });
      await getMe();
    }
  });

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        setAuthenticated,
        login,
        wrappedFetch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
