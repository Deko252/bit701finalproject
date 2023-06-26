import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Axios from "axios";

function BoardDetailPage(props) {
    const [dto,setDto] = useState([]);
    const {num,currentPage} = useParams();

    const navi = useNavigate();

    const photoUrl = process.env.REACT_APP_BOARDURL;
    const myid = sessionStorage.myid;
    const loginok = sessionStorage.loginok;
    const seletData=()=>{
        const url = `/board/detail?num=${num}`;
        Axios.get(url)
            .then(res=>{
                setDto(res.data);
            })
    }

    useEffect(()=>{
        seletData();
    },[]);

    const delBtn = () =>{
        const url = `/board/delete?num=${dto.num}`;
        const b = window.confirm("삭제하시겠습니까 ?");
        if(!b){
            return;
        }
        Axios.delete(url)
            .then(res=>{
                navi(`/board/list/${currentPage}`);
            })
    }

    return (
        <div style={{marginLeft:"30px",width:"600px"}}>
            <h5><b>{dto.subject}</b></h5>
            <h6>
                <span>작성자 : {dto.myname}({dto.myid})</span>
                <span style={{float:"right",color:"gray"}}>
                    조회&nbsp;&nbsp;{dto.readcount}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {dto.writeday}
                </span>
            </h6>
            {
                dto.photo == null?"":
                    <img alt="" src={`${photoUrl}${dto.photo}`} style={{border:"1px soild gray",maxwidth:"500px"}}/>
            }
            <br/><br/>
            <pre>{dto.content}</pre>
            <div>
                <button type="button" className="btn btn-outline-danger" style={{width:"80px"}} onClick={()=>navi("/board/form")}>글스기</button>
                <button type="button" className="btn btn-outline-danger" style={{width:"80px",marginRight:"5px"}} onClick={()=>navi(`/board/list/${currentPage}`)}>목록</button>
                {
                    loginok != "no" && sessionStorage.myid ===dto.myid?
                        <button type="button" className="btn btn-outline-danger" style={{width:"80px",marginRight:"5px"}} onClick={delBtn}>삭제</button>:""
                }
                {
                    loginok != "no" && sessionStorage.myid ===dto.myid?
                        <button type="button" className="btn btn-outline-danger" style={{width:"80px",marginRight:"5px"}} onClick={()=>{}}>수정</button>:""
                }
            </div>
        </div>
    );
}

export default BoardDetailPage;