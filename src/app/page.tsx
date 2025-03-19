import Link from 'next/link'
import { Scissors, Clock, MapPin, Phone, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { shop } from '@/lib/data'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="h-[500px] bg-blue-100 relative">
            <img
              src="/placeholder.svg?height=500&width=1920&text=Premium+Barber+Experience"
              alt="Barber Shop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/40 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl">
                  <Badge className="mb-4 bg-blue-500 hover:bg-blue-600">
                    Now Open
                  </Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {shop.name}
                  </h1>
                  <p className="text-xl text-white/90 mb-8">{shop.tagline}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/book">
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Book Appointment
                      </Button>
                    </Link>
                    <Link href="/#services">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-white text-white hover:bg-blue-700/20"
                      >
                        View Services
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Info */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-800">
                  Welcome to {shop.name}
                </h2>
                <p className="text-slate-600 mt-2">{shop.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Working Hours</div>
                    <div className="font-medium">{shop.hours}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Contact Us</div>
                    <div className="font-medium">{shop.phone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="col-span-2">
                <div className="aspect-video bg-blue-100 rounded-lg overflow-hidden mb-6">
                  <img
                    src="/placeholder.svg?height=400&width=800&text=Our+Barber+Shop"
                    alt="Barber Shop Interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="aspect-square bg-blue-100 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200&text=Gallery+1"
                      alt="Gallery 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-blue-100 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200&text=Gallery+2"
                      alt="Gallery 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-blue-100 rounded-lg overflow-hidden">
                    <img
                      src="/placeholder.svg?height=200&width=200&text=Gallery+3"
                      alt="Gallery 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-800">
                      Why Choose Us?
                    </CardTitle>
                    <CardDescription>Experience the difference</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {shop.features.map((feature, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                          <feature.icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{feature.title}</h3>
                          <p className="text-sm text-slate-500">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Separator className="my-4" />
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < shop.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-slate-600">
                        {shop.rating} out of 5
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">
                      Based on {shop.reviewCount} customer reviews
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                Our Services
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We offer a wide range of professional barber services to keep
                you looking your best. All services include a consultation to
                ensure you get exactly what you want.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shop.services.map((service) => (
                <Card
                  key={service.id}
                  className="h-full hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-blue-800">
                        {service.name}
                      </CardTitle>
                      <div className="text-xl font-semibold text-blue-700">
                        ${service.price}
                      </div>
                    </div>
                    <CardDescription className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.duration} min
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/book">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Book an Appointment
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers have
                to say about their experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shop.reviews.map((review) => (
                <Card key={review.id} className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 mb-4">"{review.comment}"</p>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-blue-700 font-medium">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-slate-500">
                          {review.date}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section id="contact" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">
                  Contact & Location
                </h2>
                <p className="text-slate-600 mb-8">
                  We're conveniently located in the heart of the city. Drop by
                  for a visit or book your appointment in advance.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-slate-600">{shop.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-slate-600">{shop.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Working Hours</h3>
                      <p className="text-slate-600">{shop.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/book">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Book an Appointment
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-blue-100 rounded-lg overflow-hidden h-[400px]">
                <img
                  src="/placeholder.svg?height=400&width=600&text=Map+Location"
                  alt="Map Location"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
