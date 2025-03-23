'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Scissors } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import type { Service, Shop } from '@prisma/client'

export default function BookAppointment() {
    const router = useRouter()
    const [services, setServices] = useState<Service[]>([])
    const [shop, setShop] = useState<Shop | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        timeSlot: '',
        selectedServices: [] as string[],
    })

    const [totalCost, setTotalCost] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)

    const timeSlots = [
        '9:00 AM',
        '9:30 AM',
        '10:00 AM',
        '10:30 AM',
        '11:00 AM',
        '11:30 AM',
        '12:00 PM',
        '12:30 PM',
        '1:00 PM',
        '1:30 PM',
        '2:00 PM',
        '2:30 PM',
        '3:00 PM',
        '3:30 PM',
        '4:00 PM',
        '4:30 PM',
        '5:00 PM',
        '5:30 PM',
    ]

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const defaultDate = tomorrow.toISOString().split('T')[0]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [shopResponse, servicesResponse] = await Promise.all([
                    fetch('/api/shop'),
                    fetch('/api/services'),
                ])

                const shopData = await shopResponse.json()
                const servicesData = await servicesResponse.json()

                if (!shopResponse.ok)
                    throw new Error(
                        shopData.error || 'Failed to load shop details',
                    )
                if (!servicesResponse.ok)
                    throw new Error(
                        servicesData.error || 'Failed to load services',
                    )

                setShop(shopData)
                setServices(servicesData)
            } catch (error: any) {
                console.error('Data fetch error:', error)
                toast({
                    title: 'Loading Error',
                    description:
                        error.message || 'Failed to load required data',
                    variant: 'destructive',
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
        setFormData((prev) => ({ ...prev, date: defaultDate }))
    }, [defaultDate])

    useEffect(() => {
        let cost = 0
        let duration = 0
        formData.selectedServices.forEach((serviceId) => {
            const service = services.find((s) => s.id === serviceId)
            if (service) {
                cost += service.price
                duration += service.duration
            }
        })
        setTotalCost(cost)
        setTotalDuration(duration)
    }, [formData.selectedServices, services])

    const handleServiceToggle = (serviceId: string) => {
        setFormData((prev) => ({
            ...prev,
            selectedServices: prev.selectedServices.includes(serviceId)
                ? prev.selectedServices.filter((id) => id !== serviceId)
                : [...prev.selectedServices, serviceId],
        }))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.date ||
            !formData.timeSlot ||
            formData.selectedServices.length === 0
        ) {
            toast({
                title: 'Missing information',
                description:
                    'Please fill all required fields and select at least one service',
                variant: 'destructive',
            })
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    totalCost,
                    totalDuration,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Booking failed')
            }

            toast({
                title: 'Appointment Booked!',
                description: `Your appointment at ${shop?.name} has been scheduled for ${new Date(formData.date).toLocaleDateString()} at ${formData.timeSlot}.`,
                action: (
                    <ToastAction
                        altText="Home"
                        onClick={() => router.push('/')}
                    >
                        Go Home
                    </ToastAction>
                ),
            })

            setTimeout(() => router.push('/'), 2000)
        } catch (error: any) {
            console.error('Booking error:', error)
            toast({
                title: 'Booking Failed',
                description: error.message || 'Please try again',
                variant: 'destructive',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-blue-600 text-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Scissors className="h-6 w-6" />
                            <h1 className="text-2xl font-bold">
                                {shop?.name || 'Loading Shop...'}
                            </h1>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/admin">
                                <Button
                                    variant="outline"
                                    className="bg-transparent border-white text-white hover:bg-blue-700"
                                >
                                    Admin
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Button
                    variant="ghost"
                    className="mb-6 pl-0 text-blue-600"
                    onClick={() => router.push('/')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-800">
                                    Book an Appointment
                                </CardTitle>
                                <CardDescription>
                                    {shop
                                        ? `Fill in your details for ${shop.name}`
                                        : 'Loading shop details...'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">
                                            Personal Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Full Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    placeholder="(123) 456-7890"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">
                                            Appointment Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="date">
                                                    Date
                                                </Label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                                    <Input
                                                        id="date"
                                                        name="date"
                                                        type="date"
                                                        className="pl-10"
                                                        value={formData.date}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        min={defaultDate}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="timeSlot">
                                                    Time Slot
                                                </Label>
                                                <Select
                                                    value={formData.timeSlot}
                                                    onValueChange={(value) =>
                                                        handleSelectChange(
                                                            'timeSlot',
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger
                                                        id="timeSlot"
                                                        className="w-full"
                                                    >
                                                        <SelectValue placeholder="Select a time" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeSlots.map(
                                                            (time) => (
                                                                <SelectItem
                                                                    key={time}
                                                                    value={time}
                                                                >
                                                                    {time}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">
                                            Select Services
                                        </h3>
                                        <p className="text-sm text-slate-500">
                                            Choose one or more services
                                        </p>
                                        {isLoading ? (
                                            <div className="space-y-4">
                                                {[1, 2, 3].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="h-20 bg-slate-100 animate-pulse rounded-md"
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {services.map((service) => (
                                                    <div
                                                        key={service.id}
                                                        className="flex items-start space-x-3 p-3 rounded-md border border-slate-200 hover:bg-slate-50"
                                                    >
                                                        <Checkbox
                                                            id={service.id}
                                                            checked={formData.selectedServices.includes(
                                                                service.id,
                                                            )}
                                                            onCheckedChange={() =>
                                                                handleServiceToggle(
                                                                    service.id,
                                                                )
                                                            }
                                                        />
                                                        <div className="grid gap-1.5 leading-none w-full">
                                                            <div className="flex justify-between w-full">
                                                                <label
                                                                    htmlFor={
                                                                        service.id
                                                                    }
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    {
                                                                        service.name
                                                                    }
                                                                </label>
                                                                <span className="font-medium text-blue-700">
                                                                    $
                                                                    {
                                                                        service.price
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between w-full">
                                                                <p className="text-sm text-slate-500">
                                                                    {
                                                                        service.description
                                                                    }
                                                                </p>
                                                                <span className="text-sm text-slate-500 flex items-center">
                                                                    <Clock className="h-3 w-3 mr-1" />
                                                                    {
                                                                        service.duration
                                                                    }{' '}
                                                                    min
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                        disabled={isSubmitting || isLoading}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Booking...
                                            </div>
                                        ) : (
                                            'Confirm Booking'
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-800">
                                    Booking Summary
                                </CardTitle>
                                <CardDescription>
                                    Review your appointment details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium text-slate-700">
                                        Shop
                                    </h4>
                                    {shop ? (
                                        <>
                                            <p className="text-slate-600">
                                                {shop.name}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {shop.location}
                                            </p>
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3"></div>
                                            <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2"></div>
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <h4 className="font-medium text-slate-700">
                                        Selected Services
                                    </h4>
                                    {formData.selectedServices.length === 0 ? (
                                        <p className="text-sm text-slate-500">
                                            No services selected yet
                                        </p>
                                    ) : (
                                        <ul className="space-y-2">
                                            {formData.selectedServices.map(
                                                (serviceId) => {
                                                    const service =
                                                        services.find(
                                                            (s) =>
                                                                s.id ===
                                                                serviceId,
                                                        )
                                                    return service ? (
                                                        <li
                                                            key={service.id}
                                                            className="flex justify-between"
                                                        >
                                                            <span className="text-slate-600">
                                                                {service.name}
                                                            </span>
                                                            <span className="font-medium">
                                                                ${service.price}
                                                            </span>
                                                        </li>
                                                    ) : null
                                                },
                                            )}
                                        </ul>
                                    )}
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <h4 className="font-medium text-slate-700">
                                        Date & Time
                                    </h4>
                                    <p className="text-slate-600">
                                        {formData.date
                                            ? new Date(
                                                  formData.date,
                                              ).toLocaleDateString('en-US', {
                                                  weekday: 'long',
                                                  year: 'numeric',
                                                  month: 'long',
                                                  day: 'numeric',
                                              })
                                            : 'No date selected'}
                                    </p>
                                    <p className="text-slate-600">
                                        {formData.timeSlot ||
                                            'No time selected'}
                                    </p>
                                </div>

                                <Separator />

                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-700">
                                            Total Duration:
                                        </span>
                                        <span className="font-medium flex items-center">
                                            <Clock className="h-4 w-4 mr-1 text-blue-600" />
                                            {totalDuration} min
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg">
                                        <span className="font-medium text-slate-700">
                                            Total Cost:
                                        </span>
                                        <span className="font-bold text-blue-700">
                                            ${totalCost.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 border-t rounded-b-lg">
                                <p className="text-sm text-slate-500 w-full text-center">
                                    You will pay at the shop after your service
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>

            <footer className="bg-blue-800 text-white py-8 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-blue-200">
                        © {new Date().getFullYear()}{' '}
                        {shop?.name || 'Barber Shop'}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
