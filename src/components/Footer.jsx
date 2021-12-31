import React from "react";

const Footer = () => {
  const currentDate = new Date();
  return (
    <footer>
      <p>Copyright © {currentDate.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
