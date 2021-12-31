import { React, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Main } from "../styleComponents/Common/Common.styles";
import Navbar from "../styleComponents/Navbar/Navbar";
import Joi from "joi";
import { Alert } from "@mui/material";
import auth from "../services/auth";

const LoginPage = (props) => {
  const { user, setUser } = props;
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(userDetails).error;
    if (errors) setError(errors.details[0].message);
    else {
      setError(null);
      try {
        await auth.login(userDetails);
        window.location.href = "/";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          setError(ex.response.data);
        }
      }
    }
  };

  const validate = (user) => {
    const schema = Joi.object({
      email: Joi.string().required().min(5).max(50),
      password: Joi.string().required().min(8).max(1024),
    });
    return schema.validate(user);
  };
  return (
    <Main>
      <Navbar user={user} setUser={setUser} />
      <Container className="formContainer">
        <img src="/images/register.jpg" alt="" />

        <Form onSubmit={handleSubmit}>
          <h3>Login</h3>
          {error && (
            <Alert
              severity="error"
              onClose={() => {
                setError(null);
              }}
            >
              {error}
            </Alert>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="primary-buttton"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </Main>
  );
};

export default LoginPage;
