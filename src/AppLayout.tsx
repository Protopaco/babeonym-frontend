import Header from "@/pages/Header";

import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default AppLayout;