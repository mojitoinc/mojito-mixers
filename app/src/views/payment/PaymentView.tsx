import { useState } from "react";
import styled from "styled-components";
import { CreatePayment } from "./CreatePayment";
import { Invoices } from "./Invoices";
import { ChargeCard } from "./ChargeCard";

const Navbar = styled.nav`
  margin: 1em 0;
  div {
    max-width: 400px;
    display: flex;
    justify-content: space-between;
  }

  p {
    cursor: pointer;
    font-weight: bold;
  }
`;

const NavItem = styled.p<{ active: boolean }>`
  border-bottom: 1px solid
    ${(props) => (props.active ? "#EF9F40" : "transparent")};
`;

interface NavMenuProps {
  activeTab: string;
  setMenuTab(tab: string): void;
}

const NavMenu: React.FC<NavMenuProps> = ({
  activeTab,
  setMenuTab,
}) => {
  return (
    <div>
      <Navbar>
        <div>
          <NavItem
            onClick={() => setMenuTab("create")}
            active={activeTab === "create"}
          >
            Payment Method
          </NavItem>
          <NavItem
            onClick={() => setMenuTab("invoices")}
            active={activeTab === "invoices"}
          >
            Invoices
          </NavItem>
          <NavItem
            onClick={() => setMenuTab("charge")}
            active={activeTab === "charge"}
          >
            Charge Card
          </NavItem>
        </div>
      </Navbar>
    </div>
  );
};

export const PaymentView: React.FC = () => {
  const [menuTab, setMenuTab] = useState("create");

  return (<>
      <NavMenu setMenuTab={setMenuTab} activeTab={menuTab} />

      { menuTab === "create" ? (
        <CreatePayment />
      ) : menuTab === "charge" ? (
        <ChargeCard />
      ) : (
        <Invoices />
      ) }
  </>);
};
