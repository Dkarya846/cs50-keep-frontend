import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
`;

export const StyledHeader = styled.header`
  background-color: #000;
  padding: 2rem 1rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 18%;
`;

export const Heading = styled.h1`
  color: #fff;
  font-family: "McLaren", cursive;
  font-size: 1.5rem;
  margin: 0;
`;

export const Main = styled.div`
  width: 100%;
  height: 100vh;

  overflow: auto;
`;

export const NotesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-evenly;
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 1280px;
`;

export const LoginButtons = styled.div`
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
`;

// User Name
export const UserName = styled.p`
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
`;
