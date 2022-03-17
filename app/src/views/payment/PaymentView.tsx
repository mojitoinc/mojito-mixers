import { useCallback, useState } from "react";
import { CreatePayment } from "./CreatePayment";
import { Invoices } from "./Invoices";
import { ChargeCard } from "./ChargeCard";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface NavMenuProps {
  activeTab: string;
  setMenuTab(tab: string): void;
}

const NavMenu: React.FC<NavMenuProps> = ({
  activeTab,
  setMenuTab,
}) => {
  const handleChange = useCallback((_, tab: string) => {
    if (tab) setMenuTab(tab);
  }, [setMenuTab]);

  return (
    <ToggleButtonGroup exclusive value={activeTab} onChange={handleChange}>

      <ToggleButton value="create">
        1. Create Payment Method
      </ToggleButton>

      <ToggleButton value="invoices">
        2 Create Invoice
      </ToggleButton>

      <ToggleButton value="charge">
        3. Charge Card
      </ToggleButton>

    </ToggleButtonGroup>
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
