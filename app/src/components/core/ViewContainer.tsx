import styled from "styled-components";
import React from "react";

const StyledContainer = styled.div`
  width: 80%;
  margin: auto;
  display: block;
  position: relative;
`;

export const ViewContainer: React.FC = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
