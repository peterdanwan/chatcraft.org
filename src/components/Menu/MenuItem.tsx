import React from "react";
import { MenuItem as ReactMenuMenuItem } from "@szhsin/react-menu";
import { useColorModeValue } from "@chakra-ui/react";

export interface MenuItemProps {
  label: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return <ReactMenuItem onClick={onClick}>{label}</ReactMenuItem>;
};

export default MenuItem;
