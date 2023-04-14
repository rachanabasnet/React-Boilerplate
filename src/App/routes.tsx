import React from "react";  
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import AuthenticatedRoute from "../commons/routes/Authenticated";
import UnAuthenticatedRoute from "../commons/routes/UnAuthenticated";
import routes from "../commons/routes/routes";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthenticatedRoute/>}>
                </Route>
                <Route element={<UnAuthenticatedRoute/>}>
                    <Route path={routes.home.path} element={<routes.home.component/>}/>
                    <Route path={routes.login.path} element={<routes.login.component/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;