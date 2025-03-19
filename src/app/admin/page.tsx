'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Filter,
  Scissors,
  Search,
  User,
  Settings,
  ListPlus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { getAppointments, shop } from '@/lib/data'

export default function AdminDashboard() {
  const router = useRouter()
  const appointments = getAppointments()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('all')
  const [filterService, setFilterService] = useState('all')

  // Filter appointments based on search and filters
  const filteredAppointments = appointments.filter((appointment) => {
    // Search filter
    const searchMatch =
      appointment.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const statusMatch =
      filterStatus === 'all' || appointment.status === filterStatus

    // Service filter
    const serviceMatch =
      filterService === 'all' || appointment.serviceId === filterService

    // Date filter
    let dateMatch = true
    const today = new Date()
    const appointmentDate = new Date(appointment.date)

    if (filterDate === 'today') {
      dateMatch =
        appointmentDate.getDate() === today.getDate() &&
        appointmentDate.getMonth() === today.getMonth() &&
        appointmentDate.getFullYear() === today.getFullYear()
    } else if (filterDate === 'tomorrow') {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      dateMatch =
        appointmentDate.getDate() === tomorrow.getDate() &&
        appointmentDate.getMonth() === tomorrow.getMonth() &&
        appointmentDate.getFullYear() === tomorrow.getFullYear()
    } else if (filterDate === 'thisWeek') {
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      dateMatch = appointmentDate >= startOfWeek && appointmentDate <= endOfWeek
    }

    return searchMatch && statusMatch && dateMatch && serviceMatch
  })

  // Group appointments by date for the calendar view
  const appointmentsByDate = filteredAppointments.reduce(
    (acc, appointment) => {
      const date = appointment.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(appointment)
      return acc
    },
    {} as Record<string, typeof appointments>,
  )

  // Get stats
  const totalAppointments = appointments.length
  const todayAppointments = appointments.filter((a) => {
    const today = new Date()
    const appointmentDate = new Date(a.date)
    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    )
  }).length
  const pendingAppointments = appointments.filter(
    (a) => a.status === 'pending',
  ).length
  const completedAppointments = appointments.filter(
    (a) => a.status === 'completed',
  ).length

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6" />
              <h1 className="text-2xl font-bold">{shop.name}</h1>
            </div>
            <div className="flex gap-3">
              <Link href="/">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-blue-700"
                >
                  View Site
                </Button>
              </Link>
              <Button variant="secondary">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
          <Button
            variant="ghost"
            className="text-blue-600"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Site
          </Button>
        </div>

        {/* Admin Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">
                Manage Services
              </CardTitle>
              <CardDescription>Add, edit or remove services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md">
                <ListPlus className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/admin/services')}
              >
                Manage Services
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">
                Shop Details
              </CardTitle>
              <CardDescription>Update your shop information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md">
                <Settings className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/admin/shop')}
              >
                Edit Shop Details
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">
                View Website
              </CardTitle>
              <CardDescription>
                See how customers view your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md">
                <img
                  src="/placeholder.svg?height=100&width=100&text=Preview"
                  alt="Website Preview"
                  className="h-12 w-auto"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Go to Website
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">
                Total Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalAppointments}</div>
              <p className="text-sm text-slate-500">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayAppointments}</div>
              <p className="text-sm text-slate-500">Scheduled for today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingAppointments}</div>
              <p className="text-sm text-slate-500">Awaiting service</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedAppointments}</div>
              <p className="text-sm text-slate-500">Successfully served</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">
              Appointment Management
            </CardTitle>
            <CardDescription>
              View and manage all customer appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      placeholder="Search appointments..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label>Service</Label>
                  <Select
                    value={filterService}
                    onValueChange={setFilterService}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      {shop.services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Date</Label>
                  <Select value={filterDate} onValueChange={setFilterDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="thisWeek">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mb-6">
                <Button
                  variant="ghost"
                  className="text-blue-600"
                  onClick={() => {
                    setSearchTerm('')
                    setFilterService('all')
                    setFilterStatus('all')
                    setFilterDate('all')
                  }}
                >
                  Clear Filters
                </Button>
              </div>

              <TabsContent value="list" className="space-y-4">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500">
                      No appointments found matching your filters.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-4 font-medium bg-slate-100 rounded-t-md">
                      <div className="col-span-3">Customer</div>
                      <div className="col-span-2">Date & Time</div>
                      <div className="col-span-3">Service</div>
                      <div className="col-span-1">Duration</div>
                      <div className="col-span-1">Price</div>
                      <div className="col-span-2">Status</div>
                    </div>

                    {filteredAppointments.map((appointment, index) => (
                      <div
                        key={appointment.id}
                        className={`grid grid-cols-12 gap-2 p-4 items-center ${index !== filteredAppointments.length - 1 ? 'border-b' : ''}`}
                      >
                        <div className="col-span-3 flex items-center gap-2">
                          <div className="bg-blue-100 rounded-full p-1">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {appointment.customerName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {appointment.customerEmail}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="font-medium">
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-slate-500">
                            {appointment.time}
                          </div>
                        </div>

                        <div className="col-span-3">{appointment.service}</div>

                        <div className="col-span-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-slate-500" />
                          {appointment.duration} min
                        </div>

                        <div className="col-span-1 font-medium">
                          ${appointment.price}
                        </div>

                        <div className="col-span-2 flex gap-2">
                          <Badge
                            variant={
                              appointment.status === 'completed'
                                ? 'default'
                                : appointment.status === 'pending'
                                  ? 'outline'
                                  : 'secondary'
                            }
                            className={
                              appointment.status === 'completed'
                                ? 'bg-green-500'
                                : appointment.status === 'pending'
                                  ? 'border-blue-500 text-blue-500'
                                  : 'bg-red-100 text-red-500'
                            }
                          >
                            {appointment.status}
                          </Badge>

                          <Select
                            defaultValue={appointment.status}
                            onValueChange={(value) => {
                              console.log(
                                `Changed status of appointment ${appointment.id} to ${value}`,
                              )
                              // In a real app, this would update the appointment status
                            }}
                          >
                            <SelectTrigger className="h-7 w-24">
                              <SelectValue placeholder="Change" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="calendar">
                <div className="space-y-6">
                  {Object.keys(appointmentsByDate).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500">
                        No appointments found matching your filters.
                      </p>
                    </div>
                  ) : (
                    Object.entries(appointmentsByDate)
                      .sort(
                        ([dateA], [dateB]) =>
                          new Date(dateA).getTime() - new Date(dateB).getTime(),
                      )
                      .map(([date, dateAppointments]) => (
                        <div key={date} className="space-y-2">
                          <h3 className="text-lg font-medium flex items-center gap-2 text-blue-800">
                            <Calendar className="h-5 w-5" />
                            {new Date(date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                            <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                              {dateAppointments.length} appointments
                            </Badge>
                          </h3>

                          <div className="space-y-2 pl-7">
                            {dateAppointments
                              .sort((a, b) => {
                                const timeA = a.time.split(':').map(Number)
                                const timeB = b.time.split(':').map(Number)
                                return (
                                  timeA[0] * 60 +
                                  timeA[1] -
                                  (timeB[0] * 60 + timeB[1])
                                )
                              })
                              .map((appointment) => (
                                <Card
                                  key={appointment.id}
                                  className="border-l-4 border-l-blue-500"
                                >
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="font-medium">
                                          {appointment.time} -{' '}
                                          {appointment.customerName}
                                        </div>
                                        <div className="text-sm text-slate-500">
                                          {appointment.service}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className="text-sm font-medium">
                                          ${appointment.price}
                                        </div>
                                        <Badge
                                          variant={
                                            appointment.status === 'completed'
                                              ? 'default'
                                              : appointment.status === 'pending'
                                                ? 'outline'
                                                : 'secondary'
                                          }
                                          className={
                                            appointment.status === 'completed'
                                              ? 'bg-green-500'
                                              : appointment.status === 'pending'
                                                ? 'border-blue-500 text-blue-500'
                                                : 'bg-red-100 text-red-500'
                                          }
                                        >
                                          {appointment.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-blue-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200">
            © {new Date().getFullYear()} {shop.name} Admin Dashboard. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Label component for the admin page
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-medium mb-1.5 text-slate-700">{children}</div>
  )
}
