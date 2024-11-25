import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'


const LayoutContainer = styled.div`
  background-color: #e9ecef;
  display: flex;
  flex-direction: column; 
  align-items: center; 
`;

//  Outlet: 자식 컴포넌트가 들어오는 자리
// 예 : /login => Outlet 대신 <Loign/> 컴포넌트가 들어옴
const Layout = () => {

  return (
    <LayoutContainer>
      <Header></Header> {/* 메뉴바 */}
      <Outlet></Outlet> {/* 상세화면 - Loign, Register, Home*/}
    </LayoutContainer>
  )
}

export default Layout