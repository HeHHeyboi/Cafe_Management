import Logo from './Logo'
import Dropdownlist from './dropdownlist'

const Navbar = () => {
  return (
    <nav className="flex justify-between py-4 sm:py-8 px-4 sm:px-8 gap-4"> 
      <Logo />

      <div className="flex gap-4">
        <Dropdownlist />
        </div>
    </nav>
  )
}

export default Navbar
