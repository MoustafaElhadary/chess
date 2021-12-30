import AuthWrapper from "components/AuthWrapper";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthWrapper>
        <DndProvider
          backend={TouchBackend}
          options={{ enableMouseEvents: true }}
        >
          <Component {...pageProps} />
        </DndProvider>
      </AuthWrapper>
    </RecoilRoot>
  );
}

export default App;