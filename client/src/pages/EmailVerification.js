import { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/Message/errorMessage";
import FormContainer from "../components/FormContainer/FormContainer";
import { TextField, Button, CircularProgress } from "@mui/material";
import * as routes from "../constants/routes";
import * as userAction from "../actions/userAction";
import * as userConstants from "../constants/userConstants";
import { useNavigate, useLocation } from "react-router-dom";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const userAuthData = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userAuthData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect =
    new URLSearchParams(location.search).get("redirect") || routes.HOME;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userAction.emailVerification(verificationCode));
  };

  return (
    <>
      {error && (
        <ErrorMessage
          header="Auth Error"
          message={error}
          reset={userConstants.RESET}
        />
      )}
      <FormContainer>
        <h1>Verify Your Email</h1>
        <Form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Verification Code"
            name="code"
            autoComplete="code"
            autoFocus
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" sx={{ color: "#fff" }} />
            ) : (
              <>Verify</>
            )}
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Enter Code: 123456 if email not recieved
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default EmailVerification;
