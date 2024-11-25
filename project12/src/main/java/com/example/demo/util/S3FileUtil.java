package com.example.demo.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;

/*
 * 전달받은 파일스트림을 S3에 업로드하고, S3의 파일 URL을 반환한다
 * 만약 이미지가 없다면 메소드를 바로 종료한다
 * */
@Component
public class S3FileUtil {

	@Autowired
	AmazonS3 amazonS3;

	// 내 버킷의 이름
	String bucketName = "youlbucket";

	// 스토리지에 파일을 업로드하고 처리 결과를 반환
	// 매개변수: 사용자에게 전달받은 파일 스트림
	// 반환값: 성공(S3 URL 주소) / 실패(Null)
	 public String fileUpload(MultipartFile image) {

	      // 파일이 없으면 여기서 종료
	      if (image.isEmpty() == true) {
	         return null;
	      }

	      // S3 스토리지에 파일을 업로드하고 URL 주소 반환
	      String url = uploadImageToS3(image);
	      
	      System.out.println("S3주소: " + url);

	      return url;
	   }
	   
	   // 실제로 AWS S3에 파일을 업로드하는 함수
	   private String uploadImageToS3(MultipartFile image) {
	      
	      // 파일 스트림에서 파일명 추출
	      String orgin = image.getOriginalFilename();
	      
	      // 확장자 추출
	      // ex) test.png -> png 추출
	      int index = orgin.lastIndexOf('.'); // ex) 4
	      String extention = orgin.substring(index + 1); //.png -> png
	      
	      // s3에 업로드할 파일 이름 (중복이 되지 않도록 설정)
	      // 같은 이름의 파일이 있을 때 중복을 방지하기 위해 UUID 추가
	      String s3FileName = UUID.randomUUID()
	                        .toString()
	                        .substring(0, 10) + orgin;
	      
	      // 파일에서 스트림 추출
	      InputStream is;
	      
	      // URL주소
	      String url = "";
	      
	      try {
				is = image.getInputStream();
				
				// 파일을 바이트 배열로 변환
				byte[] bytes = IOUtils.toByteArray(is);
				
				// S3에 전송 하기 위한 바이트 배열 스트림 생성
				ByteArrayInputStream byteStream = new ByteArrayInputStream(bytes);
				
				// 등록 요청을 보내기 위한 헤더 설정
				ObjectMetadata metadata = new ObjectMetadata();
				
				// 파일의 타입과 크기 설정
				// 예시: image/png 또는 image/jpg
				metadata.setContentType("image/" + extention); //image/jpg
				metadata.setContentLength(bytes.length);
				
				// S3 스토리지에 파일을 전송
				// 생성자 인자: 버킷이름, 파일이름, 바이트 스트림, 메타데이터(헤더)
				PutObjectRequest request = new PutObjectRequest(bucketName, s3FileName, byteStream, metadata);
				
				// 등록 요청을 전송
				amazonS3.putObject(request);
				
				// 등록된 파일의 주소를 조회
				// 인자: 버킷이름, s3파일이름
				// 반환값: 파일의 URL주소
				url = amazonS3
							.getUrl(bucketName, s3FileName)
							.toString();
				
	      } catch (IOException e) {
	    	  e.printStackTrace();
	      }
	      return url;
	   }
	
}

//	private String uploadImageToS3(MultipartFile image) {
//		
//		String originalFilename = image.getOriginalFilename(); // 원본 파일 명
//		String extention = originalFilename.substring(originalFilename.lastIndexOf(".")); // 확장자 명
//		String s3FileName = UUID.randomUUID().toString().substring(0, 10) + originalFilename; // 변경된 파일 명
//
//		InputStream is;
//		try {
//			is = image.getInputStream();
//			byte[] bytes = IOUtils.toByteArray(is); // image를 byte[]로 변환
//
//			ObjectMetadata metadata = new ObjectMetadata(); // metadata 생성
//			metadata.setContentType("image/" + extention.replace(".", "")); //.png -> png
//			metadata.setContentLength(bytes.length);
//
//			// S3에 요청할 때 사용할 byteInputStream 생성
//			ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
//
//			// S3로 putObject 할 때 사용할 요청 객체
//			// 생성자 : bucket 이름, 파일 명, byteInputStream, metadata
//			PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3FileName, byteArrayInputStream, metadata)
//					.withCannedAcl(CannedAccessControlList.PublicRead);
//
//			// 실제로 S3에 이미지 데이터를 넣는 부분이다.
//			amazonS3.putObject(putObjectRequest); // put image to S3
//			
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//
//		return amazonS3.getUrl(bucketName, s3FileName).toString();
//	}
