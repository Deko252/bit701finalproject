import React, {useEffect, useState} from 'react';
import "../App.css";
import Axios from "axios";
import MemberRowList from "./MemberRowList";
function MemberList(props) {
    const [mlist,setMliit] = useState([]);
    //목록 가져오는 함수
    const getList=()=>{
        const url ="/member/list";
        Axios.get(url)
            .then(res =>{
                setMliit(res.data);
            })
    }

    //삭제하는 함수
    const deleteMember = (num) =>{
        const url ="/member/delete?num="+num;
        Axios.delete(url)
            .then(res=>{
                //목록다시 출력
                getList();
            })
    }

    useEffect(() =>{
        getList();
    },[]);
    return (
        <div>
            <h1>총 회원 수 : {mlist.length}명</h1>
            <table className="table table-bordered" style={{width:"600px"}}>
                <tr style={{backgroundColor:"#ddd"}}>
                    <th style={{width:"40px"}}>번호</th>
                    <th style={{width:"60px"}}>회원명</th>
                    <th style={{width:"80px"}}>아이디</th>
                    <th style={{width:"150px"}}>주소</th>
                    <th style={{width:"100px"}}>가입일</th>
                    <th style={{width:"100px"}}>삭제</th>
                </tr>
                {
                    mlist.map((row,idx) => <MemberRowList key={idx} idx={idx} row={row} onDelete={deleteMember}/>)
                }
            </table>
        </div>
    );
}

export default MemberList;