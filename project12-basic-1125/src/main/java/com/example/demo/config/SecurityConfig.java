package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

// 시큐리티 + 설정 클래스 : 프로젝트가 실행될때 해당클래스가 먼저 실행됨 
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	
	// 커스텀 필터 체인을 생성하는 함수
	// 매개변수: 시큐리티 객체로, 메소드가 실행될 때 스프링이 주입해줌
	// 리턴값: 사용자 권한을 검사하는 핉터체인
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) {
		
		http.build();
	}

}
