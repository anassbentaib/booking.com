import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[2518px] mx-auto xl:px-20 md:px-3  sm: ">
      {children}
    </div>
  );
};

export default Container;
