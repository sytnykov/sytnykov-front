import { useFormContext } from "react-hook-form";

import { cn } from "@/utils/cn";

interface FormTextareaProps {
  name: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
  variant?: "gradient" | "soft";
}

const FormTextarea = ({
  name,
  placeholder,
  rows = 6,
  required = false,
  variant = "gradient",
}: FormTextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name]?.message as string | undefined;

  if (variant === "soft") {
    return (
      <div className="relative">
        <textarea
          rows={rows}
          placeholder={placeholder}
          {...register(name, required ? { required: "Обов’язкове поле" } : {})}
          className={cn(
            "w-full resize-none rounded-[16px] border bg-[#f3f6fd] px-5 py-4 text-[15px] text-dark transition-colors duration-300 placeholder:text-dark/60 focus:border-accent-strong focus:bg-white focus:outline-none",
            fieldError ? "border-red-500" : "border-transparent"
          )}
        />
        {fieldError && (
          <p className="absolute -bottom-[16px] left-0 text-xs text-red-500">
            {fieldError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-[146px] rounded-lg p-[1px] before:absolute before:inset-0 before:z-[-1] before:rounded-lg before:bg-gradient-to-br",
        fieldError
          ? "before:from-red-500 before:to-red-500"
          : "before:from-[#213767] before:to-[#CBDBFF]"
      )}
    >
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name, required ? { required: "Обов’язкове поле" } : {})}
        className="w-full resize-none rounded-md px-[20px] py-[13px] focus:outline-none"
      />
      {fieldError && (
        <p className="absolute -bottom-[16px] left-0 text-xs text-red-500">
          {fieldError}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;
