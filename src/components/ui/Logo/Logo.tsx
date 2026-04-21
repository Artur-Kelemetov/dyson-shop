import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.svg'
import "./Logo.scss"

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link 
      to="/" className={`logo ${className}`} 
      aria-label="Home" 
      title="Home"
      onClick={() => window.scrollTo(0, 0)}
    >
      <img src={logo} alt="" className="logo__image" width="183" height="77"/>
    </Link>
  )
}