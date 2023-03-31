const AuthFormInput = ({id, label, placeholder, type, value, name}) => {
    return (
        <div className="mt-4">
        <label
          className="block mb-2 text-base font-bold text-gray-600 "
          for={id}
        >
          {label}
        </label>
        <input
          id={id}
          className="block w-full px-4 py-2 text-gray-700 bg-white border-2 rounded-lg focus:border-emerald-400 focus:ring-opacity-40 focus:outline-none"
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
        />
      </div>
    )
}

export default AuthFormInput;