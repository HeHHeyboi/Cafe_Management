import Logo from "./Logo"

const Navbar = () => {
  return (
    <nav>
        <div className=" flex justify-between" >
            <Logo />

            <div className="flex space-x-4">
                <a href="#" className="text-gray-900">Menu</a>
                <a href="#" className="text-gray-900">Gallery</a>
                <a href="#" className="text-gray-900"></a>
            </div>
        </div>
    </nav>
      
  )
}

export default Navbar
