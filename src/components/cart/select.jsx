const Select = (props) => {

  const { title, disableSelected, options, onChange } = props;

  const handleSelectChange = (event) => {
    onChange(event.target.value);
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
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};
export default Select;
