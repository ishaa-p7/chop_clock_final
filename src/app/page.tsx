"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import { Scissors, Clock, MapPin, Phone, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Shop {
  id: string
  name: string
  tagline: string
  description: string
  hours: string
  phone: string
  location: string
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
}

const features = [
  {
    title: "Expert Barbers",
    description: "Certified professionals with 10+ years experience",
    icon: Scissors
  },
  {
    title: "Premium Products",
    description: "We use only top-quality grooming products",
    icon: Star
  },
  {
    title: "Hygiene First",
    description: "Sterilized tools & single-use materials",
    icon: MapPin
  }
]

const reviews = [
  {
    id: "1",
    name: "John Smith",
    comment: "Best barber experience I've ever had!",
    rating: 5,
    date: "2024-03-15"
  },
  {
    id: "2",
    name: "Mike Johnson",
    comment: "Consistently great haircuts every time",
    rating: 5,
    date: "2024-02-28"
  },
  {
    id: "3",
    name: "Sarah Wilson",
    comment: "Friendly staff and amazing service",
    rating: 4,
    date: "2024-03-10"
  }
]

const rating = 4.8
const reviewCount = 127

export default function Home() {
    const [shop, setShop] = useState<Shop | null>(null)
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [shopResponse, servicesResponse] = await Promise.all([
                    fetch('/api/shop'),
                    fetch('/api/services')
                ])

                if (!shopResponse.ok) throw new Error('Failed to fetch shop data')
                if (!servicesResponse.ok) throw new Error('Failed to fetch services')

                const shopData = await shopResponse.json()
                const servicesData = await servicesResponse.json()

                setShop(shopData)
                setServices(servicesData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        )
    }

    if (!shop) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-500">No shop data found</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <main>
                <section className="relative">
                    <div className="h-[500px] bg-blue-100 relative">
                        <img
                            src="images/banner1.jpg"
        
                            alt="Barber Shop"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0  flex items-center">
                            <div className="container mx-auto px-4">
                                <div className="max-w-xl">
                                    <Badge className="mb-4 bg-blue-500 hover:bg-blue-600">
                                        Now Open
                                    </Badge>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                        {shop.name}
                                    </h1>
                                    <p className="text-xl text-white/90 mb-8">
                                        {shop.tagline}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link href="/book">
                                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                                Book Appointment
                                            </Button>
                                        </Link>
                                        <Link href="/#services">
                                            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-blue-700/20">
                                                View Services
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-800">
                                    Welcome to {shop.name}
                                </h2>
                                <p className="text-slate-600 mt-2">
                                    {shop.description}
                                </p>
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
                                        src="images/banner2.webp"
                                        alt="Barber Shop Interior"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="aspect-square bg-blue-100 rounded-lg overflow-hidden object-top">
                                            <img
                                                src={`/images/square1.jpg`}
                                                alt={`Gallery ${i}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl text-blue-800">Why Choose Us?</CardTitle>
                                        <CardDescription>Experience the difference</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {features.map((feature, index) => (
                                            <div key={index} className="flex gap-3">
                                                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                                                    <feature.icon className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{feature.title}</h3>
                                                    <p className="text-sm text-slate-500">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <Separator className="my-4" />
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-5 w-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-slate-600">{rating} out of 5</span>
                                        </div>
                                        <p className="text-sm text-slate-500">Based on {reviewCount} customer reviews</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="services" className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Services</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                We offer a wide range of professional barber services to keep you looking your best.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <Card key={service.id} className="h-full hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-xl text-blue-800">{service.name}</CardTitle>
                                            <div className="text-xl font-semibold text-blue-700">${service.price}</div>
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

                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-blue-800 mb-4">What Our Customers Say</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Don't just take our word for it. Here's what our customers have to say.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {reviews.map((review) => (
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
                                                <span className="text-blue-700 font-medium">{review.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <div className="font-medium">{review.name}</div>
                                                <div className="text-sm text-slate-500">{review.date}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-800 mb-6">Contact & Location</h2>
                                <p className="text-slate-600 mb-8">
                                    We're conveniently located in the heart of the city.
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
                                        <Button className="bg-blue-600 hover:bg-blue-700">Book an Appointment</Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-blue-100 rounded-lg overflow-hidden h-[400px]">
                                <img
                                    src="/images/map.jpg"
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