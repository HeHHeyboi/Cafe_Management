import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Company Info */}
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-bold mb-4 text-amber-400">Samannachan Cafe</h3>
                                            <p className="text-gray-300 leading-relaxed">
                                            ร้านสมานฉันท์ คาเฟ่ 🙌🏻 หลังม.ขอนแก่น
                                            </p>
                                            <div className="flex space-x-4 pt-4">
                                                <a href="https://www.facebook.com/samannachan.cafe" target="_blank" rel="noopener noreferrer">
                                                    <FaFacebook className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
                                                </a>
                                                <a href="https://x.com/samannachan" target="_blank" rel="noopener noreferrer">
                                                    <FaTwitter className="h-6 w-6 text-sky-400 hover:text-sky-300 cursor-pointer transition-colors" />
                                                </a>
                                                <a href="https://www.instagram.com/samannachan.cafe/" target="_blank" rel="noopener noreferrer">
                                                    <FaInstagram className="h-6 w-6 text-pink-400 hover:text-pink-300 cursor-pointer transition-colors" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-amber-400">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'Menu', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a 
                                        href={`/${item.toLowerCase().replace(' ', '')}`}
                                        className="text-gray-300 hover:text-amber-400 transition-colors flex items-center space-x-2"
                                    >
                                        <span>→</span>
                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-amber-400">Contact Us</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-center space-x-3">
                                <MdLocationOn className="h-5 w-5 text-amber-400" />
                                <span>741 , Moo 12 , Sila Khon Kaen District, Thailand, Khon Kaen 40000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Café Management. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;