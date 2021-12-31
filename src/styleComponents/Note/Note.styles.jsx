import styled from "styled-components";

export const NoteContainer = styled.div`
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 5px #ccc;
  padding: 1rem;
  width: 240px;
  height: min-content;
  position: relative;

  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const NoteTitle = styled.div`
  font-size: 1.25em;
  font-weight: 500;
  margin-bottom: 6px;
  box-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

export const NoteContent = styled.div`
  font-size: 1em;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  max-height: 136px;
  overflow: auto;
`;
