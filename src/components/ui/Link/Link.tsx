import type { ReactNode } from "react"
import "./Link.scss"

type LinkProps = {
  children: ReactNode
  href: string
  className: string
}

export const Link = ({ children, href, className }: LinkProps) => {
  return (
    <a href={href} className={className}>{children}</a>
  )
}