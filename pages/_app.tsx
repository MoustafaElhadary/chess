import { AuthProvider } from "hooks/useAuth";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          refreshInterval: 2000,
          fetcher: async (input, init) => {
            const res = await fetch(input, init);
            return res.json();
          },
        }}
      >
        <AuthProvider>
          <DndProvider
            backend={TouchBackend}
            options={{ enableMouseEvents: true }}
          >
            <Component {...pageProps} />
          </DndProvider>
        </AuthProvider>
      </SWRConfig>
    </RecoilRoot>
  );
}

export default App;
