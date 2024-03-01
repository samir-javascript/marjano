import React, { ReactNode } from "react";
import { Alert, AlertProps } from "react-bootstrap";

interface MessageProps {
  variant?: AlertProps["variant"];
  children: ReactNode;
  className?: string; // Add className to MessageProps
}

const Message: React.FC<MessageProps> = ({ variant = "info", children, className }) => {
  return (
    <Alert
      className={`${
        variant === "danger" ? "bg-red-100 text-[#ff5921]" : ""
      } ${className || ""} flex items-center mx-4 mt-3 mb-12 justify-center text-center`}
      variant={variant}
    >
      {children}
    </Alert>
  );
};

export default Message;
