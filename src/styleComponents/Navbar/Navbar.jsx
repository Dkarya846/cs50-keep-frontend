import React from "react";
import { Link } from "react-router-dom";
import { Heading, LoginButtons } from "../Common/Common.styles";
import CustomMenu from "../CustomMenu/CustomMenu";
import { NavContainer } from "./Navbar.styles";
import jwt_decode from "jwt-decode";

const Navbar = (props) => {
  const { user: jwt } = props;
  let user = null;
  if (jwt) user = jwt_decode(jwt);

  return (
    <NavContainer>
      <Heading>
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          <span style={{ color: "#a51c30" }}>CS50 </span>Keep
        </Link>
      </Heading>
      {user ? (
        <CustomMenu user={user} />
      ) : (
        <LoginButtons>
          <Link
            style={{
              color: "#fff",
              textDecoration: "none",
              marginRight: "1rem",
            }}
            to="/login"
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{ color: "#fff", textDecoration: "none" }}
            x
          >
            Register
          </Link>
        </LoginButtons>
      )}
    </NavContainer>
  );
};

export default Navbar;
