import { useState } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { IoHome } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import CheckoutSteps from "../layouts/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";

const ShippingInfo = () => {
  const shippingInfoData = JSON.parse(localStorage.getItem("shippingInfo"))
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {};

  const [formData, setFormData] = useState({
    address: shippingInfoData.address || "",
    state: shippingInfoData.state || "",
    phoneNo: shippingInfoData.phoneNo || "",
    pincode: shippingInfoData.pincode || "",
    country: shippingInfoData.country || null, // Assuming country is selected from a dropdown
    city: shippingInfoData.city || "",
  });

  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const countries = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

  // Get state options from the library
  const states = State.getStatesOfCountry(formData.country?.value || "").map(
    (state) => ({
      label: state.name,
      value: state.isoCode,
    })
  );

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert formData object to a JSON string
    const formDataString = JSON.stringify(formData);

    setStep((step) => step + 1);
    // Store the JSON string in localStorage
    localStorage.setItem("shippingInfo", formDataString);
    navigate("/order/confirm");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col mt-24">
      <MetaData title="Shipping Info" />

      <CheckoutSteps activeStep={step} />
      <div className="w-[100%] mx-auto p-6 bg-white shadow-md rounded-md border">
        <h2 className="text-2xl flex items-center justify-center font-semibold mb-8 text-[1rem] md:text-xl">
          Shipping Information
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-1 flex items-center justify-between gap-4 w-full px-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              <IoHome className="text-xl text-slate-700" />
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-1 flex items-center justify-between gap-4 w-full px-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              <FaCity className="text-xl text-slate-700" />
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-1 flex items-center justify-between gap-4 w-full px-2">
            <label
              htmlFor="phoneNo"
              className="block text-sm font-medium text-gray-600"
            >
              <FaPhone className="text-xl text-slate-700" />
            </label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-1 flex items-center justify-between gap-4 w-full px-2">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-600"
            >
              <FaLocationDot className="text-xl text-slate-700" />
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-1 flex items-center justify-between gap-4 w-full px-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-600"
            >
              <FaGlobeAmericas className="text-xl text-slate-700" />
            </label>
            <Select
              options={countries}
              isSearchable
              name="country"
              id="country"
              placeholder="Select Country"
              className="mt-1"
              value={formData.country}
              onChange={(value) => handleChange("country", value)}
            />
          </div>

          <div className="mb-1 flex items-center justify-between gap-4 w-full px-2">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              <FaPersonWalkingArrowRight className="text-xl text-slate-700" />
            </label>
            <Select
              options={states}
              isSearchable
              name="state"
              id="state"
              placeholder="Select State"
              className="mt-1"
              value={formData.state}
              onChange={(value) => handleChange("state", value)}
            />
          </div>

          <button
            style={{ backgroundColor: "tomato" }}
            type="submit"
            className=" text-white py-2 px-4 rounded-md transition duration-300 w-full mt-3 font-bold tracking-widest"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingInfo;
