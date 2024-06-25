import React from "react";
import {
  Drawer,
  List,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { TbSteeringWheel } from "react-icons/tb";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import MovingIcon from "@mui/icons-material/Moving";
import { BiTrip } from "react-icons/bi";

interface BurgerMenuProps {
  isOpen: boolean;
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface RouteItem {
  text: string;
  icon: React.ReactElement;
  path: string;
}

const routes: RouteItem[] = [
  { text: "Home", icon: <HomeIcon />, path: "/dashboard" },
  {
    text: "Escala de Motoristas",
    icon: <LocalShippingIcon />,
    path: "/drivers-schedule",
  },
  {
    text: "Coordenação de viagens",
    icon: <TbSteeringWheel />,
    path: "/daily-trips-schedule",
  },
  {
    text: "Partidas e chegadas",
    icon: <SwapVertIcon />,
    path: "/departures-and-arrivals",
  },
  {
    text: "Viagens diárias",
    icon: <MovingIcon />,
    path: "/daily-trips",
  },
  {
    text: "Cenários",
    icon: <BiTrip />,
    path: "/scenarios",
  },
];

export function BurgerMenu({ isOpen, toggleDrawer }: BurgerMenuProps) {
  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        sx={{ padding: "20px 0 10px" }}
      >
        <img src="/pepsico-logo.png" width={144} height={40} alt="PepsiCo" />
      </Box>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {routes.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <Link href={path} passHref style={{ width: "100%" }}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
