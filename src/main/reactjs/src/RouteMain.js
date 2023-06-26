import React from 'react';
import {Home, Menu} from "./components";
import {Route, Routes} from "react-router-dom";
import {LoginForm, MemberForm, MemberList} from "./member";
import {BoardForm, BoardList} from "./borad";

import 'bootstrap/dist/css/bootstrap.min.css';

function RouteMain(props) {
    return (
        <div>
            <Menu/>
            <br style={{clear:"both"}}/><br/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginForm/>}/>

                <Route path="/member">
                    <Route path="form" element={<MemberForm/>}/>
                    <Route path="list" element={<MemberList/>}/>
                </Route>

                <Route path="/board">
                    <Route path="form" element={<BoardForm/>}/>
                    <Route path="list" element={<BoardList/>}/>
                    <Route path="list/:currentPage" element={<BoardList/>}/>
                </Route>

                <Route path="*" element={
                    <div className="error404">

                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default RouteMain;