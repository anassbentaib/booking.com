// CitySelect.js

import React from "react";
import Select from "react-select";

interface CitySelectProps {
  value?: string;
  onChange: (value: string) => void;
  cities: string[];
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange, cities }) => {
  const cityOptions = cities.map((city) => ({
    label: city,
    value: city,
  }));

  return (
    <div>
      <label>Select City:</label>
      <Select
        value={cityOptions.find((option) => option.value === value)}
        options={cityOptions}
        onChange={(selectedOption: any) => onChange(selectedOption.value)}
        isDisabled={cities.length === 0}
      />
    </div>
  );
};

export default CitySelect;
