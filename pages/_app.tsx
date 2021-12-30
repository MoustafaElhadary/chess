import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}}>
        <Component {...pageProps} />
      </DndProvider>
    </RecoilRoot>
  );
}

export default MyApp;
