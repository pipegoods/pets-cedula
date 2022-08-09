export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  buttonType?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  className?: string;
};
