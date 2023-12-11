import * as React from "react";
import Box from "@mui/system/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../Redux/userSlice";
import { useAlert } from "react-alert";

export default function UserOptions({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const alert = useAlert();

  const dashboard = () => {};
  const profile = () => {
    window.location.href = "/profile";
  };
  const orders = () => {};
  const logoutUser = () => {
    dispatch(LogoutUser());
    alert.success("You have logged out successfully");
    window.location.href = "/login";
  };

  const actions = [
    { icon: <PersonIcon />, name: "Profile", func: profile },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <ExitToAppIcon />, name: "LogOut", func: logoutUser },
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
        position: "absolute",
        top: "5rem",
        right: "5rem",
        zIndex: 1000,
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
