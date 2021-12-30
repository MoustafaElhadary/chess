import { AuthProvider } from "hooks/auth";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <DndProvider
          backend={TouchBackend}
          options={{ enableMouseEvents: true }}
        >
          <Component {...pageProps} />
        </DndProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;