import { AuthNavbar } from "../components";

const Layout = ({ children }: { children: React.ReactNode }) => (
    <>
        <AuthNavbar />
        {children}
    </>
);

export default Layout;
