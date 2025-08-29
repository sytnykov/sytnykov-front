import { useFormContext } from "react-hook-form";

import { cn } from "@/utils/cn";

interface FormFieldProps {
  name: string;
  type?: "text" | "tel" | "email" | "password";
  variant?: "basic" | "gradient";
  placeholder: string;
  required?: boolean;
  wrapperClassName?: string;
  inputClassName?: string;
}

const FormField = ({
  name,
  type = "text",
  placeholder,
  variant,
  required = false,
  wrapperClassName = "",
  inputClassName = "",
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name]?.message as string | undefined;

  const wrapperStyles = cn(
    "relative h-full w-full",
    variant === "basic" &&
      "birder-[1.5px] rounded-full border border-solid border-dark",
    variant === "basic" && (fieldError ? "border-red-500" : "border-dark"),
    variant === "gradient" &&
      "rounded-md p-[1px] before:absolute before:inset-0 before:z-[-1] before:rounded-md before:bg-gradient-to-br",
    variant === "gradient" &&
      (fieldError
        ? "before:from-red-500 before:to-red-500"
        : "before:from-[#213767] before:to-[#CBDBFF]"),
    wrapperClassName
  );

  const inputStyles = cn(
    "w-full  focus:outline-none",
    variant === "basic" && "rounded-full px-6 py-[13px]",
    variant === "gradient" && "rounded-md px-[20px] py-[13px]",
    inputClassName
  );

  return (
    <div className={cn(wrapperStyles)}>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, required ? { required: "Обов’язкове поле" } : {})}
        className={cn(inputStyles)}
      />
      {fieldError && (
        <p className="absolute -bottom-[16px] left-0 text-xs text-red-500">
          {fieldError}
        </p>
      )}
    </div>
  );
};

export default FormField;
