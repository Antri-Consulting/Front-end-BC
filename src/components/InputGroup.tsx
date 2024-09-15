import { ComponentProps, useState } from "react";

export type InputGroupProps = Omit<
  ComponentProps<"input">,
  "name" | "id" | "type" | "vlaue" | "onChange" | "className"
> & {
  name: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputGroup = ({ name, type, value, ...restProps }: InputGroupProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className="form__inputGroup">
      <label className="form__inputGroup--label" htmlFor={name}>
        {name}
      </label>
      <input
        className="form__inputGroup--input"
        {...restProps}
        id={name}
        name={name}
        value={value}
        type={type === "password" ? (showPass ? "text" : "password") : type}
        minLength={type === "password" ? 6 : undefined}
      />
      {type === "password" && (
        <i
          data-testid="visibility-btn"
          onClick={() => setShowPass(!showPass)}
          className={`form__inputGroup--icon bx bx-low-vision ${
            showPass ? "" : "active"
          }`}
        ></i>
      )}
    </div>
  );
};

export default InputGroup;
