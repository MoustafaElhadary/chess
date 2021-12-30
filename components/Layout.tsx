import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
