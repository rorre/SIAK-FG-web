// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { Toaster } from "solid-toast";
import { AuthContextProvider } from "./components/AuthContext";

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>SIAK-FG</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <AuthContextProvider>
              <Toaster />
              <div class="drawer">
                <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                  <div class="w-full navbar bg-base-300">
                    <div class="flex-none lg:hidden">
                      <label for="my-drawer-3" class="btn btn-square btn-ghost">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          class="inline-block w-6 h-6 stroke-current"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          ></path>
                        </svg>
                      </label>
                    </div>
                    <div class="flex-1 px-2 mx-2">SIAK-FG</div>
                    <div class="flex-none hidden lg:block">
                      <ul class="menu menu-horizontal">
                        <li>
                          <A href="/">Home</A>
                        </li>
                        <li>
                          <A href="/auth">Login</A>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </div>
                <div class="drawer-side">
                  <label for="my-drawer-3" class="drawer-overlay"></label>
                  <ul class="menu p-4 w-80 bg-base-100">
                    <li>
                      <A href="/">Home</A>
                    </li>
                    <li>
                      <A href="/auth">Login</A>
                    </li>
                  </ul>
                </div>
              </div>
            </AuthContextProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
