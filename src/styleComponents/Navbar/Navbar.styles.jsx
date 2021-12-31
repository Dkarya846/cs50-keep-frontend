import styled from "styled-components";
import Fab from "@mui/material/Fab";

export const NavContainer = styled.nav`
  background: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  padding: 0 1.5rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
`;

export const StyledDelete = styled(Fab)`
  position: "absolute";
  right: "-1rem";
  width: "2.25rem";
  height: "2.25rem";
  top: "-1rem";
  cursor: "pointer";
  color: "white";
  background: "rgb(165, 28, 48)";
`;
