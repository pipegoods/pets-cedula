import { ButtonProps } from 'types/Button';

const Button = ({
  children,
  onClick,
  buttonType = 'primary',
  className,
}: ButtonProps) => {
  return (
    <button className={`btn btn-${buttonType} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
