import React from "react";
import { Typography, IconButton } from "@mui/material";
import { GitHub, Menu } from "@mui/icons-material";
import s from "./Header.module.scss";
const Header = () => {
  return (
    <header className={s.header}>
      <ul>
        <li>
          <Typography color="secondary" variant="body1">
            <IconButton color="secondary">
              <Menu />
            </IconButton>
            Form Generator App
          </Typography>
        </li>
        <li>
          <IconButton color="secondary">
            <GitHub />
          </IconButton>
        </li>
      </ul>
    </header>
  );
};

export default Header;
