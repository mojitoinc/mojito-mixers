import styled from "styled-components";

const StyledContainer = styled.div`
  width: 80%;
  margin: auto;
  display: block;
  position: relative;
`;

export const ViewContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
