import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Container from "./Container";
import SignForm from "./SigninForm";
import axios from "axios";
import { Button } from "@mui/material";

const Sign = () => {
  const navigate = useNavigate();

  const signin = async (id: string, pw: string) => {
    const body = {
      id: id,
      pw: pw,
    };
    const result = await axios.post("https://heyinsa.kr/sbd/signin", body);
    console.log(result);
    if (result.data === "success") {
      window.localStorage.setItem("id", id);
      navigate("/app");
    }
  };

  useEffect(() => {
    const id = window.localStorage.getItem("id");
    if (!!id && id !== "") {
      navigate("/app");
    }
  }, []);

  return (
    <Container>
      <SignInBox>
        <h1>Sell Buy Day</h1>
        <SignForm submitAction={signin} submitButtonText="Sign In" />
      </SignInBox>
    </Container>
  );
};

export default Sign;

const SignInBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  h1 {
    text-align: center;
  }
`;
