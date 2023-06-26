import React, {useState} from 'react';
import "../App.css";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
function LoginForm(props) {
    const [myid,setMyid]=useState('');
    const [mypass,setMypass]=useState('');
    const navi=useNavigate();

    const onSubmitEvent=(e)=>{
        e.preventDefault();//기본 이벤트 무효화
        const url = "/member/login?myid=" + myid + "&mypass=" + mypass;
        Axios.post(url,{myid,mypass})
            .then(res=>{
                if(res.data.success === "yes" ){
                    //localStorage:직접 지우기 전에는 브라우정 남아있음
                    //sessionStorage:브라우저 닫으면 지워짐
                    sessionStorage.loginok="yes";
                    sessionStorage.myname=res.data.myname;
                    sessionStorage.myid=myid;
                    navi("/");
                    window.location.reload();//새로고침
                }else{
                    sessionStorage.loginok="no";
                    sessionStorage.myname="";
                    sessionStorage.myid="";
                    alert("아이디 또는 비밀번호가 틀렸습니다.");
                }
            })

    }
    return (
        <div>
            <form onSubmit={onSubmitEvent}>
                <table className='table' style={{width:'500px'}}>
                    <caption align="top"><b>로그인</b></caption>
                    <tbody>
                    <tr>
                        <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>아이디</th>
                        <td className='input-group'>
                            <input type='text' className='form-control'
                                   placeholder='아이디' required
                                   value={myid} onChange={(e)=>{
                                setMyid(e.target.value)
                            }}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'100px',backgroundColor:'#b0e0e6'}}>비밀번호</th>
                        <td>
                            <input type='password' className='form-control'
                                   required
                                   value={mypass} onChange={(e)=>setMypass(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'>
                            <button type='submit' className='btn btn-outline-info'
                                    style={{width:'100px'}}>로그인</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default LoginForm;