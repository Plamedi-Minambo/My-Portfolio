
const Button = ({ children, className = '', onClick }) => {
  return (
    <button
      className={`py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button