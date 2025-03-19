import React from 'react'
import Link from 'next/link'
import { Scissors } from 'lucide-react'

function Footer() {
  return (
    <div>
      <footer className="bg-blue-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Scissors className="h-5 w-5" />
                BarberBook
              </h3>
              <p className="text-blue-200">
                The easiest way to book your next barber appointment.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-200 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-blue-200 hover:text-white"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-blue-200 hover:text-white"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-blue-200 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="not-italic text-blue-200">
                <p>123 Barber Street</p>
                <p>Haircut City, HC 12345</p>
                <p className="mt-2">Email: info@barberbook.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-300">
            <p>
              © {new Date().getFullYear()} BarberBook. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
