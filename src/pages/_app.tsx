import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "rc-tooltip/assets/bootstrap.css";
import ProtectedRoute from "./protectedRoutes";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ProtectedRoute router={router}>
        <Component {...pageProps} />
      </ProtectedRoute>
    </>
  );
}

export default MyApp;
