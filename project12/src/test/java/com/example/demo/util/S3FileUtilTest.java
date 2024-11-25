package com.example.demo.util;

import java.util.UUID;

import org.junit.jupiter.api.Test;

public class S3FileUtilTest {

	@Test
	public void 테스트() {
		
		// UUID :테스트
		// UUID :랜덤으로 값을 생성하는 클래스
		String str = UUID.randomUUID().toString().substring(0,10);
		
		System.out.println(str);
	}
	
	@Test
	public void 확장자테스트() {
		String orgin = "test.png";
		
		int index = orgin.lastIndexOf("."); // 예:4
		String extention = orgin.substring(index + 1); // 예: png
		
		System.out.println(extention);
	}
}
