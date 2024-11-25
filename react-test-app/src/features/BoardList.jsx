import React from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useState, useEffect } from 'react';


import { useContext } from 'react';
import { Context } from '../index';

import { useSelector } from 'react-redux';




// 게시물 리스트를 변수에 저장
// const data = [];

const BoardList = () => {

  const token = useSelector((state) => state.member.token);
  
  // 게시물 리스트를 state에 저장
  // 상태(state)는 값이 변경되면 화면이 다시 렌더링됨
  // state는 컴포넌트의 주기에 의존하기 때문에 컴포넌트 함수 밖에서는 사용할수 없음
  let [data , setData] = useState(null);
  
  const navigate = useNavigate();

  // Context에사 host 데이터 가져오기
  const {host} = useContext(Context);

  // 컴포넌트가 로드될때 한번만 API를 호출하기 위해 useEffect를 사용
  // 인자: 실행할 코드, 실행주기(빈배열은 한번만 실행한다는 의미)
  useEffect(()=>{

    // 게시물 리스트 API호출
    // async ~ await
    // axios는 비동기 함수로 응답이 오면 다음작업을 처리한다
    // 동기식: 코드를 순차적으로 실행
    // 비동기식: 응답이 오면 다음코드를 실행
    const callApi = async () => {
  
      // axios: ajax, fetch와 같은 통신 함수
      // 메소드 방식에 따라 get post 메소드 사용
      // 인자: 주소, 헤더 + 파라미터
      const response = await axios.get(
        `${host}/board/list`,
        {
          headers: { 
            Authorization: token
          }
        }
      );
  
      // API에서 응답을 받으면 남은 작업을 처리
      // 요청에 성공했다면 리스트를 저장하고 실패했다면 에러를 발생시키기
      if(response.status === 200) {
        // data = response.data;
  
        // state는 아래와 같이 적용해야된다
        setData(response.data);
      } else {
        throw new Error(`api error: ${response.status} ${response.statusText}`);
      }
    }
    
    // 함수 호출
    callApi();

  }, [] );





  // 문제: 컴포넌트 로드 => API호출 => state 변경
  //       => 컴포넌트 생성 => 무한 루프... 
  return (
    <CustomCard>
      <CustomContainer>
        <Row>
            <Col sm={8}>
              <h3>게시물 리스트</h3>
            </Col>
            <Col sm={4}>
              <Button variant="secondary" onClick={ ()=>{
                
                navigate('/board/register');
              } } >게시물 등록</Button>
            </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {
              data !== null && data.map( (board)=>{
                
                return (
                      <tr key={board.no}>
                        <td><Link to={ '/board/read/'+board.no  }>{board.no}</Link></td>
                        <td>{board.title}</td>
                        <td>{board.writer}</td>
                        <td>{board.regDate}</td>
                      </tr>
                );
              })
            }
          </tbody>
        </Table>

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardList