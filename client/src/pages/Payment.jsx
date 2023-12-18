import CheckoutSteps from "../layouts/CheckoutSteps";

const Payment = () => {
  return (
    <div className="flex items-start justify-center w-full h-screen p-24">
      <CheckoutSteps activeStep={2} />
    </div>
  );
};

export default Payment;
