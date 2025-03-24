'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Scissors, User, Settings, ListPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { shop } from '@/lib/data'

interface Appointment {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  totalPrice: number
  totalDuration: number
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterDate, setFilterDate] = useState('all')

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments')
        if (!response.ok) throw new Error('Failed to fetch appointments')
        const data = await response.json()
        setAppointments(data)
      } catch (err) {
        setError('Failed to load appointments')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  const filteredAppointments = appointments.filter((appointment) => {
    const today = new Date()
    const appointmentDate = new Date(appointment.date)
    
    if (filterDate === 'today') {
      return (
        appointmentDate.getDate() === today.getDate() &&
        appointmentDate.getMonth() === today.getMonth() &&
        appointmentDate.getFullYear() === today.getFullYear()
      )
    }
    if (filterDate === 'tomorrow') {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return (
        appointmentDate.getDate() === tomorrow.getDate() &&
        appointmentDate.getMonth() === tomorrow.getMonth() &&
        appointmentDate.getFullYear() === tomorrow.getFullYear()
      )
    }
    if (filterDate === 'thisWeek') {
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek
    }
    return true
  })

  const appointmentsByDate = filteredAppointments.reduce(
    (acc, appointment) => {
      const date = appointment.date
      if (!acc[date]) acc[date] = []
      acc[date].push(appointment)
      return acc
    },
    {} as Record<string, Appointment[]>
  )

  if (loading) return <div className="text-center p-8">Loading...</div>
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-slate-50">
     

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>
          <Button variant="ghost" className="text-blue-600" onClick={() => router.push('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Site
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">Manage Services</CardTitle>
              <CardDescription>Add, edit or remove services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md">
                <ListPlus className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/admin/services')}>
                Manage Services
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">Shop Details</CardTitle>
              <CardDescription>Update your shop information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md">
                <Settings className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/admin/shop')}>
                Edit Shop Details
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">View Website</CardTitle>
              <CardDescription>See how customers view your site</CardDescription>
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
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Go to Website</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{appointments.length}</div>
              <p className="text-sm text-slate-500">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {appointments.filter(a => 
                  new Date(a.date).toDateString() === new Date().toDateString()
                ).length}
              </div>
              <p className="text-sm text-slate-500">Scheduled for today</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">Appointment Management</CardTitle>
            <CardDescription>View and manage all customer appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

              <TabsContent value="list" className="space-y-4">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500">No appointments found matching your filters.</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-4 font-medium bg-slate-100 rounded-t-md">
                      <div className="col-span-4">Customer</div>
                      <div className="col-span-3">Date & Time</div>
                      <div className="col-span-3">Duration</div>
                      <div className="col-span-2">Price</div>
                    </div>

                    {filteredAppointments.map((appointment, index) => (
                      <div
                        key={appointment.id}
                        className={`grid grid-cols-12 gap-2 p-4 items-center ${
                          index !== filteredAppointments.length - 1 ? 'border-b' : ''
                        }`}
                      >
                        <div className="col-span-4 flex items-center gap-2">
                          <div className="bg-blue-100 rounded-full p-1">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{appointment.customerName}</div>
                            <div className="text-xs text-slate-500">{appointment.customerEmail}</div>
                          </div>
                        </div>

                        <div className="col-span-3">
                          <div className="font-medium">
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-slate-500">{appointment.time}</div>
                        </div>

                        <div className="col-span-3 flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-slate-500" />
                          {appointment.totalDuration} min
                        </div>

                        <div className="col-span-2 font-medium">${appointment.totalPrice}</div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="calendar">
                <div className="space-y-6">
                  {Object.entries(appointmentsByDate).map(([date, dateAppointments]) => (
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
                        {dateAppointments.map((appointment) => (
                          <Card key={appointment.id} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">
                                    {appointment.time} - {appointment.customerName}
                                  </div>
                                  <div className="text-sm text-slate-500">
                                    Duration: {appointment.totalDuration} mins
                                  </div>
                                </div>
                                <div className="text-sm font-medium">${appointment.totalPrice}</div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium mb-1.5 text-slate-700">{children}</div>
}