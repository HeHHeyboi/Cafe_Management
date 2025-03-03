import Logo from './Logo'
import Dropdownlist from './dropdownlist'

const Navbar = () => {
  return (
    <nav className="container flex justify-between text-lg"> 
      <Logo />

      <div className="flex gap-3 items-center">
        <Dropdownlist />
      </div>
    </nav>
  )
}

export default Navbar
