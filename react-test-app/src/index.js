import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { createContext } from 'react';

import { Provider } from 'react-redux';
import store from './store/store';
import { login } from './store/memberSlice';

// 서버 주소
let host ='http://localhost:8080';

// Context생성
// Context: 여러 컴포넌트에서 값을 공유할 때 사용
// store, slice: 여러 컴포넌트에서 state를 공유할 때 사용
export const Context = createContext();

// 로그인 상태를 유지하기 위해
// 로컬스토리지에 있는 로그인 데이터를 꺼내서 다시 로그인
const userStr = localStorage.getItem('user');
const token = localStorage.getItem('token');
if (userStr !== null) {
  const user = JSON.parse(userStr);
  store.dispatch(login({ user: user, token: token }));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <React.StrictMode>
      {/* Context.Provider 로 APP 컴포넌트 감싸기
          하위 컴포넌트에게 host 데이터 전달  */}
      <Context.Provider value={{host}}>
        <Provider store={store}>
        <App />
      </Provider>
      </Context.Provider>
    </React.StrictMode>
  </BrowserRouter>
);