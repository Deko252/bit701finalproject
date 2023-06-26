import React from 'react';
import "../App.css";
import {NavLink} from "react-router-dom";
function Menu(props) {
    const logout=()=>{
        sessionStorage.loginok = "no";
        sessionStorage.myname="";
        sessionStorage.myid="";
        window.location.reload();//새로고침
    }
    return (
        <ul className="menu">
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/member/form"}>회원가입</NavLink>
            </li>
            <li>
                <NavLink to={"/member/list"}>회원목록</NavLink>
            </li>
            <li>
                <NavLink to={"/board/list/1"}>게시판</NavLink>
            </li>
            {
                sessionStorage.loginok == "yes"?
                    <li>
                        <NavLink to={"/"} onClick={logout}><p style={{fontSize:"5px"}}>로그아웃 {sessionStorage.myname}</p></NavLink>
                    </li>:
                    <li>
                        <NavLink to={"/login"}>로그인</NavLink>
                    </li>
            }
        </ul>
    );
}

export default Menu;