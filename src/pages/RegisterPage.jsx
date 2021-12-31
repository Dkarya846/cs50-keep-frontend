import { Alert } from "@mui/material";
import Joi from "joi";
import { React, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import auth from "../services/auth";
import { Main } from "../styleComponents/Common/Common.styles";
import Navbar from "../styleComponents/Navbar/Navbar";
const RegisterPage = (props) => {
  const { user, setUser } = props;
  const [userDetails, setUserDetails] = useState({
    name: "",
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
        await auth.loginWithJWT(userDetails);
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
      name: Joi.string().required().min(5).max(50),
      email: Joi.string().required().min(5).max(50),
      password: Joi.string().required().min(8).max(1024),
    });

    return schema.validate(user);
  };

  return (
    <Main>
      <Navbar user={user} setUser={setUser} />
      <Container className="formContainer">
        <img src="/images/register.jpg" alt="register" />
        <Form onSubmit={handleSubmit}>
          <h3>Register</h3>
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
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={userDetails.name}
              type="text"
              onChange={handleChange}
              name="name"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={userDetails.email}
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={userDetails.password}
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="primary-buttton">
            Submit
          </Button>
        </Form>
      </Container>
      .
    </Main>
  );
};
export default RegisterPage;
