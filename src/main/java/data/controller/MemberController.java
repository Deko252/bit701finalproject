package data.controller;

import data.dto.MemberDto;
import data.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/member")
@AllArgsConstructor
public class MemberController {
    MemberService memberService;

    @PostMapping("/insert")
    public void insert(@RequestBody MemberDto dto){
        System.out.println("insert >> " + dto);
        memberService.insertMember(dto);
    }

    @GetMapping("/list")
    public List<MemberDto> list(){
        System.out.println("list >> ");
        return memberService.getAllMembers();
    }

    @DeleteMapping("/delete")
    public void delete(int num){
        System.out.println("delete >> " + num);
        memberService.deleteMember(num);
    }

    @GetMapping("/getname")
    public String getName(String myid){
        System.out.println("getname >> " + myid);
        return memberService.getName(myid);
    }

    @GetMapping("/searchid")
    public int serchId(String myid){
        System.out.println("searchid >> " + myid);
        return memberService.getSearchId(myid);
    }

    @PostMapping("/login")
    public Map<String,String> login(String myid , String mypass){
        System.out.println("login >> " + myid +  "  >> mypass >> " + mypass) ;
        int n = memberService.getLogin(myid,mypass);
        System.out.println("n >> " + n);
        //성공시 가입한 이름도 같이 보낸다
        String myname="";
        if(n == 1) {
            myname=memberService.getName(myid);
        }
        Map<String,String> map = new HashMap<>();
        map.put("success", n==1? "yes":"no");
        map.put("myname",myname);
        return map;
    }

}
