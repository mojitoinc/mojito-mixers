import { Container } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import { AuthButton } from "../auth/AuthButton";

const HeaderStyled = styled.div`
  height: 60px;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  color: white;
  box-shadow: 4px 5px 20px 0 rgb(0 61 33 / 12%);
  border-radius: 12px;
  padding: 0 24px;
  margin-top: 24px;
`;

export function Header() {
  return (
    <Container>
      <HeaderStyled>
        <Link href="/">
          <a style={{ display: "block" }}>
            <img src="/img/logos/mojito-light-logo.svg" style={{ height: "32px" }} />
          </a>
        </Link>

        <AuthButton />
      </HeaderStyled>
    </Container>
  );
}
