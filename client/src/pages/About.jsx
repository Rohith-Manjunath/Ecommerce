import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-8 mt-20">
      <h2 className="text-3xl font-bold mb-4">
        Welcome to Our E-commerce Platform
      </h2>
      <p className="text-gray-600">
        Explore a world of premium products and exceptional shopping experiences
        on our e-commerce platform. We curate a diverse range of high-quality
        items, ensuring that every purchase brings joy and satisfaction to our
        customers.
      </p>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Why Choose Us?</h3>
        <p className="text-gray-600">
          At our e-commerce store, we prioritize customer satisfaction, offering
          a seamless and secure online shopping environment. Here are some key
          features that set us apart:
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Wide selection of products from trusted brands</li>
          <li>Secure and convenient online transactions</li>
          <li>Responsive customer support for any queries</li>
          <li>Fast and reliable delivery services</li>
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Our Commitment to Quality</h3>
        <p className="text-gray-600">
          We are dedicated to providing our customers with products that meet
          the highest standards of quality. Our commitment extends to delivering
          a user-friendly and visually appealing website to enhance your
          shopping experience.
        </p>
      </div>
    </div>
  );
};

export default About;
