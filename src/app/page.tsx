'use client'

import Navbar from './_components/Navbar'
import Footer from './_components/Footer'
import { SessionProvider } from 'next-auth/react'
import GoogleButton from './_components/GoogleButton'

const HomePage = () => {

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <section className="hero bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://www.styleseat.com/blog/wp-content/uploads/2021/09/barber-terms-hero-scaled-1.jpg')" }}>
            <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-white px-6">
                <h2 className="text-5xl font-bold mb-4">Style, Precision, Confidence</h2>
                <p className="text-lg mb-6">Experience top-notch haircuts and grooming services.</p>
                <a href="#contact" className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600">Book an Appointment</a>
              </div>
            </div>
          </section>
    
          <section id="services" className="py-12">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-bold mb-6 text-center">Our Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h4 className="text-xl font-semibold mb-3">Haircuts</h4>
                  <p>Classic cuts, fades, and modern styles tailored to your look.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h4 className="text-xl font-semibold mb-3">Beard Grooming</h4>
                  <p>Expert beard trims and styling for the perfect finish.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h4 className="text-xl font-semibold mb-3">Shaves & Treatments</h4>
                  <p>Relax with a premium hot towel shave or facial treatment.</p>
                </div>
              </div>
            </div>
          </section>
    
          <section id="about" className="bg-gray-200 dark:bg-gray-800 py-12 text-center">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-bold mb-6">About Us</h3>
              <p className="max-w-2xl mx-auto">At Barber Bliss, we combine tradition with modern style, delivering exceptional service in a relaxed environment. Our barbers are passionate about crafting the perfect look for each client.</p>
            </div>
          </section>
    
          <section id="contact" className="py-12 text-center">
            <div className="container mx-auto px-6">
              <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
              <p className="mb-6">Ready for a fresh cut? Get in touch with us or book an appointment online.</p>
              <a href="tel:+1234567890" className="text-xl text-yellow-500 font-semibold">Call Us: (123) 456-7890</a>
            </div>
          </section>
        </div>
      );

}

export default HomePage
