export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return <input {...props} />;
};

export default Input;
