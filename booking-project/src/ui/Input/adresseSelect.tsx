import React from "react";

interface AddressInputProps {
  cityValue: string;
  onChange: (value: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ cityValue, onChange }) => {
  return (
    <div>
      <label
        htmlFor="Address"
        className="font-semibold text-[14px] text-gray-900"
      >
        Address
      </label>
      <input
        type="text"
        placeholder={`Enter address in ${cityValue || "selected city"}`}
        value={cityValue}
        onChange={(e) => onChange(e.target.value)}
        className={`${"border border-black"} rounded-md focus:border-blue-500 z-30`}
      />
    </div>
  );
};

export default AddressInput;
