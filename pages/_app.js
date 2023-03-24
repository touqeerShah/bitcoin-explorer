import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";

export default function App({ Component, ...rest }) {
  const getLayout = Component.getLayout || ((page) => page);
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return getLayout(
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ToastContainer />
    </>
  );
}
