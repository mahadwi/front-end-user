const SelectPaymentMethod = ({ title, disableSelected, options, onChange }) => {

  const handleSelectChange = (event) => {
    const selectedId = event.target.options[event.target.selectedIndex].id;
    onChange(selectedId);
  };

  return (
    <div>
      <p className="font-semibold mb-5">{title}</p>
      <select
        className="select select-primary w-full max-w-full mb-2"
        onChange={handleSelectChange}
      >
        <option disabled selected>
          {disableSelected}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id} id={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SelectPaymentMethod;
