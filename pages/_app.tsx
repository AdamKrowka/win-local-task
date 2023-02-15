import { AppContextWrapper } from "@/context/appContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "store";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore({});
  return (
    <Provider store={store}>
      <AppContextWrapper>
        <Component {...pageProps} />
      </AppContextWrapper>
    </Provider>
  );
}

export default App;
