import React, { useContext, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '../index';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';


const BoardRegister = () => {
  
  const token = useSelector((state) => state.member.token);
  
  const navigate = useNavigate();

  //  새로운 게시물 데이터
  let [board, setBoard] = useState(null);

  // Context에서 host 데이터 가져오기
  const {host} = useContext(Context);

  // 입력필드의 이벤트 함수
  const handleChange = (event) => {

    // 이벤트가 발생한 엘리먼트에서 name과 사용자가 입력한 값을 추출
    const {name, value, files} = event.target;

    // 변경된 게시물 데이터를 state에 업데이트
    let newBoard = { ...board };
    
    // 파일이 첨부됬을 경우
    if (name === 'uploadFile') {
      newBoard[name] = files[0]; // value는 파일 이름 . files[0]이 실제 파일
    } else {
      // 제목이나 내용이 변경되었을 경우
      newBoard[name] = value; // 
    }
    
    setBoard(newBoard);
  }

  // 폼 이벤트 함수
  const handleSubmit = async (event) => {

    // 버튼을 클릭했을 때 이동방지
    event.preventDefault();

    // Form 객체를 생성하여 게시물 데이터 담기
    // 파일 스트림은 json 데이터로 전송할 수 없음
    const formData = new FormData();
    formData.append('title', board.title);
    formData.append('content', board.content);
    formData.append('uploadFile', board.uploadFile);

    // 게시물 등록 API 호출
    // 등록은  post
    // 인자: 주소, 파라미터, 헤더
    const response = await axios.post(
      `${host}/board/register`,
      formData,
      {
        headers: { 
          Authorization: token
        }
      }
    );

    // 응답을 받은 후 처리
    if (response.status === 201) {
      // 등록이 끝났으면 리스트로 이동
      navigate('/board/list');
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  }

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 등록</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="board.title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name="title" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="board.content">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={3}  name="content" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="board.uploadFile">
            <Form.Label>이미지</Form.Label>
            <Form.Control type="file" name="uploadFile" onChange={handleChange}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            등록
          </Button>
        </Form>
      </CustomContainer>
    </CustomCard>
  )
}

export default BoardRegister