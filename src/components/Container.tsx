import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const Paper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    overflow: scroll;
  }
`;

interface ContainerProps {
  children: JSX.Element[] | JSX.Element;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <Paper>
      <Box
        width="100%"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
    </Paper>
  );
};

export default Container;
