import "./Button.scss"

type ButtonProps = {
  children: string,
  className?: string
}

export const Button = ({ children, className = '' }: ButtonProps) => {
  return (
    <button className={`button ${className}`}>{children}</button>
  )
}