import React, {forwardRef} from "react"
import {Link} from "react-router-dom";
import styles from "../../styles/componets/ui/button.module.css";

const Button = forwardRef((
  {
    as,
    to,
    href,
    type,
    variant = "primary",  // "primary" | "ghost" | "outline" | "danger"
    size = "md",          // "sm" | "md" | "lg"
    pill = true,          // 둥근 버튼
    fullWidth = false,
    className = "",
    disabled = false,
    children,
    ...rest
   },
    ref
) => {
  const Component = as || (to ? Link : href ? "a" : "button");
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    pill && styles.pill,
    fullWidth && styles.block,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const props = {
    ref,
    className: classes,
    "aria-disabled": disabled || undefined,
    ...rest
  };

 if (Component === Link) props.to = to;
 if (href) props.href = href;
 if (Component === "button") props.type = type || "button";
 if (disabled) {
    props.disabled = true;
    props.tabIndex = -1;
 }

 return <Component {...props}>{children}</Component>

  }
);

export default Button;