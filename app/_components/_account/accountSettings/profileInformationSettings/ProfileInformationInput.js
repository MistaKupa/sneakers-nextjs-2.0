export default function ProfileInformationInput({
  inputName,
  inputType,
  type,
  placeHolder,
  value,
  onChange,
}) {
  return (
    <>
      {inputType === "select" ? (
        <div className="">
          <select
            name={inputName}
            type={type}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            className="border border-dark-300 rounded-md p-2 outline-newPrimary w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unspecified">Unspecified</option>
          </select>
        </div>
      ) : (
        <div className="">
          <input
            name={inputName}
            type={type}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            className="border border-dark-300 rounded-md p-2 outline-newPrimary w-full"
          />
        </div>
      )}
    </>
  );
}
