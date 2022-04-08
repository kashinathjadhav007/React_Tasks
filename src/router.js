import { BrowserRouter,Routes,Route } from "react-router-dom";
import Faker from "./Pages/faker";
import Cards from "./Pages/cards";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Reset_Password from "./Pages/reset_password";
import ViewPage from "./Pages/viewPage";
import Navigation from "./Pages/nav"
import Cards2 from "./Pages/cards2";
import Cards3 from "./Pages/cards3";
const Router=()=>
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigation/>}/>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/reset" element={<Reset_Password/>}/>
            {/* <Route path="/cards" element={<Cards/>}/>
            <Route path="/cards2" element={<Cards2/>}/> */}
            <Route path="/cards3" element={<Cards3/>}/>
            <Route path="/viewCard" element={<ViewPage/>}/>
            <Route path="/faker" element={<Faker/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Router;
