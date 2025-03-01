import Logo from './Logo'
import Dropdownlist from './dropdownlist'

const Navbar = () => {
  return (
    <nav className="container flex justify-between py-4 px-4 sm:px-8"> 
      <Logo />

      <div className="flex gap-3 items-center">
        <Dropdownlist />
      </div>
    </nav>
  )
}

export default Navbar
