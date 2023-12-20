import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import {
  AllInclusive,
  Create,
  Dashboard,
  List,
  SupervisedUserCircleSharp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { ReviewsOutlined } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <div className="flex items-center justify-center flex-col h-auto w-full font-bold text-gray-500 text-[14px] gap-12 ">
        <Link
          to={"/admin/dashboard"}
          className="sidebar-item flex items-center justify-center gap-2"
        >
          <Dashboard />
          <Typography variant="li" color="initial">
            Dashboard
          </Typography>
        </Link>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          style={{ backgroundColor: "none" }}
        >
          <TreeItem
            nodeId="1"
            label="Products"
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="flex items-start justify-center flex-col gap-3 p-2">
              <Link className="sidebar-item flex items-center justify-center gap-2">
                <TreeItem nodeId="2" label="Create" icon={<Create />} />
              </Link>
              <Link
                className="sidebar-item flex items-center justify-center gap-2"
                to={"/admin/products"}
              >
                <TreeItem nodeId="3" label="All" icon={<AllInclusive />} />
              </Link>
            </div>
          </TreeItem>
        </TreeView>
        <Link
          to={"/admin/orders"}
          className="sidebar-item flex items-center justify-center gap-2"
        >
          <List />
          <Typography variant="li" color="initial">
            Orders
          </Typography>
        </Link>

        <Link
          to={"/admin/users"}
          className="sidebar-item flex items-center justify-center gap-2"
        >
          <SupervisedUserCircleSharp />
          <Typography variant="li" color="initial">
            Users
          </Typography>
        </Link>
        <Link
          to={"/admin/reviews"}
          className="sidebar-item flex items-center justify-center gap-2"
        >
          <ReviewsOutlined />
          <Typography variant="li" color="initial">
            Reviews
          </Typography>
        </Link>
      </div>
    </Box>
  );
};

export default Sidebar;
