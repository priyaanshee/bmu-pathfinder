import Select from "react-select";

export default function DropdownSelector({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1 w-72">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        isSearchable
        placeholder={`Select ${label}`}
      />
    </div>
  );
}
