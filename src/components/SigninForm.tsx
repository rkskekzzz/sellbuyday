import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { TextField, Button } from "@mui/material";

interface SignFormProps {
  submitAction: (id: string, pw: string) => Promise<any>;
  submitButtonText: string;
}

const SignForm = ({ submitAction, submitButtonText }: SignFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    const result = await submitAction(email, password);
    console.log(result);
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <SignInForm onSubmit={handleSubmit}>
      <TextField
        type="text"
        name="text"
        value={email}
        onChange={handleEmailChange}
        id="outlined-basic"
        label="id"
        variant="outlined"
      />
      <TextField
        type="password"
        name="password"
        autoComplete="off"
        value={password}
        onChange={handlePasswordChange}
        id="outlined-basic"
        label="password"
        variant="outlined"
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isButtonDisabled}
      >
        {submitButtonText}
      </Button>
    </SignInForm>
  );
};

export default SignForm;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 15%;
`;
