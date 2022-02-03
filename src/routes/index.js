import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import WelcomePage from "../pages/WelcomePage";

const AppRouter = ({isAuth}) => {
    return (
        <>
            <Routes>
                <Route index element={<WelcomePage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                {
                    isAuth ? <Route path="/todo">
                    </Route> : null
                }
            </Routes>
        </>
    )
}


export default AppRouter;