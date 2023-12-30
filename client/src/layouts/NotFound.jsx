import ErrorIcon from "@material-ui/icons/Error";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ErrorIcon className="text-red-500 mb-4" />

      <Typography variant="h6" color="error" gutterBottom>
        Page Not Found
      </Typography>

      <Link
        component={RouterLink}
        to="/"
        color="primary"
        variant="body1"
        className="text-blue-500 hover:underline"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
