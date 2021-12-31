import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import auth from "../../services/auth";

export default function CustomMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    auth.logout();
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        style={{
          color: "white",
          textTransform: "unset",
          fontSize: "1.25rem",
          cursor: "pointer",
        }}
      >
        {props.user.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ marginTop: "0.5rem" }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
