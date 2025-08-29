interface IconButtonProps {
  handleClick: () => void;
  children: React.JSX.Element;
  className?: string;
}

const IconButton = ({
  handleClick,
  children,
  className = "",
}: IconButtonProps) => {
  return (
    <button
      aria-label="icon button"
      type="button"
      onClick={handleClick}
      className={`before:bg-blue laptop:hover:before:opacity-20 text-black outline-none will-change-transform before:absolute before:left-0 before:top-0 before:-z-10 before:size-full before:rounded-full before:opacity-0 before:blur-[4px] before:transition before:duration-300 before:ease-out before:content-[''] focus-visible:before:opacity-20 active:before:opacity-20 supports-[backdrop-filter]:before:blur-[4px] ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
