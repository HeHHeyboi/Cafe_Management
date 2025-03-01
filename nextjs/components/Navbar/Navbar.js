import Logo from './Logo'

const Navbar = () => {
  return (
    <div className="flex justify-between py-4 sm:py-8 px-4 sm:px-8 gap-4"> 
      <Logo />

      <div className="flex space-x-4">
        <a href="#">Menu</a>
        <a href="#">Gallery</a>
        <a href="#">GiveAway</a>
        </div>
    </div>
  )
}

export default Navbar
