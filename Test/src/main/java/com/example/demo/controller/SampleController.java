package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SampleController {

	// "/" 요청이 들어오면 => ex.html 파일 반환
	// 스프링 부트는 @ResponseBody 같은 어노테이션이 없으면 기본적으로 html파일을 반환함
	@GetMapping("/")
	public String ex() {
		// "ex"를 작성할때 경로인 "/"를 붙이면 안됨
		return "ex";  // 파일이름
		// 로컬 환경에서는 자옫으로 template 폴더를 찾지만
		// 서버환경에서는 /를 붙이면 template를 못찾음
		// 즉, 로컬환경 - 상관없음, 서버환경 - 상대경로로 작성할 것
	}
	
}
