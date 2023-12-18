import {
  AccountBalance,
  LibraryAddCheck,
  LocalShippingSharp,
} from "@material-ui/icons";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingSharp />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalance />,
    },
  ];

  const stepStyles = {
    width: "100%", // Adjust width as needed
    backgroundColor: "#f8f8f8", // Add your desired background color
    padding: "1rem", // Adjust padding as needed
    borderRadius: "0.5rem", // Add border radius
  };

  return (
    <div className="w-[90%] mx-auto">
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, i) => (
          <Step
            key={i}
            active={activeStep === i ? true : false}
            completed={activeStep >= i ? true : false}
          >
            <StepLabel
              icon={item.icon}
              className="text-center"
              StepIconProps={{
                classes: {
                  root: "text-3xl", // Adjust icon size
                },
              }}
              style={{
                color: activeStep >= i ? "tomato" : "rgba(0,0,0,0.5)",
              }}
            >
              <Typography className="text-sm font-medium">
                {item.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
