import * as React from "react";
import Box from "@mui/system/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logoutUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";

export default function UserOptions({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dashboard = () => {
    navigate("/admin/dashboard");
  };
  const profile = () => {
    navigate("/profile");
  };
  const orders = () => {
    navigate("/myorders");
  };
  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  const cart = () => {
    navigate("/cart");
  };

  const actions = [
    { icon: <PersonIcon />, name: "Profile", func: profile },
    { icon: <FaCartArrowDown />, name: "Cart", func: cart },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  if (user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Box
      sx={{
        position: "fixed", // Change to "fixed" for a consistent position
        top: "5rem",
        right: "3rem",
        zIndex: 100,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<img src={user.avatar.url} alt="" className="rounded-full" />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
