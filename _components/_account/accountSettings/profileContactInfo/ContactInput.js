function ContactInput({ inputId, label, type, value, autoComplete, onChange }) {
  return (
    <div className="w-full relative">
      <input
        className="w-full border border-dark-300 rounded-md p-3 outline-newPrimary"
        id={inputId}
        placeholder="Insert your email"
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
      />
      <span className="absolute top-0.5 left-3 text-[10px] text-dark-400 font-medium">
        {label}
      </span>
    </div>
  );
}

export default ContactInput;
