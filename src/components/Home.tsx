import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import SBDLogo from '../assets/sbd.svg';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #111111;
  color: #ffffff;

  h1 {
    box-sizing: border-box;
    position: fixed;
    margin: 0;
    padding: 5px;
    z-index: 100;
    top: 20px;
    width: 100%;
    height: 60px;

    font-size: 1.5rem;
    text-align: center;
  }

  .texts {
    width: 100%;
    text-align: center;
  }
  .btn {
    width: 60vw;
    left: 50%;
    transform: translateX(-50%);
  }

  .green {
    color: green;
  }
  .blue {
    color: blue;
  }
  .red {
    color: red;
  }
`;

const Home = () => {
  const [code, setCode] = useState('');
  const [state, setState] = useState('default');
  const [pageId, setPageId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleScan = async (code: any) => {
    const id = window.localStorage.getItem('id');
    const body = {
      id: id,
      code: code,
    };
    try {
      const result = await axios.post('https://heyinsa.kr/sbd/code', body);
      if (result.data === 'fail') {
        setState('fail');
      } else if (result.data === 'used') {
        setState('used');
      } else {
        setState('valid');
        setPageId(result.data);
      }
    } catch (e) {
      setState('network');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('id');
    navigate('/sign');
  };

  const handleClick = async () => {
    const body = {
      pageid: pageId,
    };
    try {
      const result = await axios.post('https://heyinsa.kr/sbd/check', body);
      if (result.data === 'success') {
        setState('success');
      } else {
        setState('usefail');
      }
    } catch (e) {
      setState('network');
    }
    setState('default');
    setPageId('');
    setCode('');
  };

  useEffect(() => {
    if (code !== '') handleScan(code);
  }, [code]);

  console.log(state);

  return (
    <HomeContainer>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={SBDLogo} alt='logo' height='100%' />
        <span style={{ display: 'flex' }}>
          <div style={{ color: '#c95e4b' }}>S</div>
          <div style={{ color: '#67925d' }}>B</div>
          <div style={{ color: '#5581e0' }}>D</div>
          <div style={{ marginLeft: '10px' }}>QR Code Reader</div>
        </span>
        <Button onClick={handleLogout}>logout</Button>
      </h1>
      <div>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setCode(result?.getText());
            }

            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{
            facingMode: 'environment',
          }}
        />
      </div>
      <div className='texts'>
        {
          {
            default: <p>QR Code를 스캔해주세요</p>,
            fail: <p className='red'>존재하지 않는 QR Code 입니다</p>,
            valid: <p className='blue'>유효한 QR Code 입니다</p>,
            usefail: <p className='red'>QR Code 사용에 실패했습니다(관리자에게 문의하세요)</p>,
            used: <p className='red'>이미 사용된 QR Code 입니다</p>,
            success: <p className='green'>QR Code 사용이 완료되었습니다</p>,
            network: <p>네트워크 오류가 발생했습니다</p>,
          }[state]
        }
      </div>
      <p>{errorMessage}</p>
      <Button variant='contained' className='btn' onClick={handleClick} disabled={state !== 'valid'}>
        사용하기
      </Button>
    </HomeContainer>
  );
};

export default Home;
