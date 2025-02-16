// Footer Component
'use client'

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
// import { useTheme } from "next-themes";

const Footer = () => {
    // const { theme } = useTheme();

    return (
        <>
            {/* Footer */}
            <footer className="p-4 mt-8 border-t bg-gray-200 dark:bg-gray-800 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                        CC
                    </div>
                    <p className="font-bold">ChopClock</p>
                </div>
                <div className="text-right">
                    <p>Contact us: +1 234 567 890 | email@chopclock.com</p>
                    <div className="flex space-x-4 mt-2">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook size={24} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTwitter size={24} />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
