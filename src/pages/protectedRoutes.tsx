import { getStorageValue } from "../customHooks/useLocalStorage";

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }: any) => {
  const accountInfo = getStorageValue("accountDetails", "");
  const isAuthenticated = accountInfo !== "";
  if (isBrowser() && router.pathname === "/" && isAuthenticated) {
    router.push("/dashboard");
  } else if (isBrowser() && router.pathname !== "/" && !isAuthenticated) {
    router.push("/");
  }
  return children;
};

export default ProtectedRoute;
