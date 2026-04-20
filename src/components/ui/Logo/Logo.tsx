import logo from '../../../assets/images/logo.svg'
import "./Logo.scss"

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <a href="/" className={`logo ${className}`} aria-label="Home" title="Home">
      <img src={logo} alt="" className="logo__image" width="183" height="77"/>
    </a>
  )
}