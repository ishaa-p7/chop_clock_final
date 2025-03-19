'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock, Plus, Scissors, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'
import { shop } from '@/lib/data'

export default function AdminServices() {
  const router = useRouter()
  const [services, setServices] = useState<any[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')

      // First read the response text
      const responseData = await response.text()

      if (!response.ok) {
        // Try to parse as JSON, fallback to text if needed
        try {
          const errorData = JSON.parse(responseData)
          throw new Error(errorData.error || 'Failed to load services')
        } catch {
          throw new Error(responseData || 'Failed to load services')
        }
      }

      // Now parse the successful response
      const data = JSON.parse(responseData)
      setServices(data)
    } catch (error) {
      console.error('Fetch Services Error:', error)
      toast({
        title: 'Loading Error',
        description:
          error instanceof Error ? error.message : 'Failed to load services',
        variant: 'destructive',
      })
    }
  }

  const handleAddService = async () => {
    try {
      if (
        !newService.name ||
        !newService.description ||
        !newService.price ||
        !newService.duration
      ) {
        toast({
          title: 'Missing information',
          description: 'Please fill in all fields.',
          variant: 'destructive',
        })
        return
      }

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newService.name,
          description: newService.description,
          price: newService.price,
          duration: newService.duration,
        }),
      })

      const data = await response.json() // Only parse once

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create service')
      }

      setNewService({
        name: '',
        description: '',
        price: '',
        duration: '',
      })
      setIsAddDialogOpen(false)
      await fetchServices()

      toast({
        title: 'Service added',
        description: `${data.name} has been added successfully`, // Use data.name directly
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error creating service',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      })
    }
  }

  const handleDeleteService = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete service')

      await fetchServices()
      toast({
        title: 'Service deleted',
        description: 'Service removed successfully',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error deleting service',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      })
    }
  }

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
          <div>
            <h1 className="text-3xl font-bold text-blue-800">
              Manage Services
            </h1>
            <p className="text-slate-600">
              Add or remove services offered by your shop
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="text-blue-600"
              onClick={() => router.push('/admin')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" /> Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                  <DialogDescription>
                    Add a new service to your barber shop offerings.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Service Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Classic Haircut"
                      value={newService.name}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the service..."
                      value={newService.description}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="25.00"
                        value={newService.price}
                        onChange={(e) =>
                          setNewService({
                            ...newService,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="30"
                        value={newService.duration}
                        onChange={(e) =>
                          setNewService({
                            ...newService,
                            duration: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleAddService}
                  >
                    Add Service
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">
              Your Services
            </CardTitle>
            <CardDescription>
              Manage the services you offer to your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-4 font-medium bg-slate-100 rounded-t-md">
                <div className="col-span-3">Service</div>
                <div className="col-span-4">Description</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-2">Actions</div>
              </div>

              {services.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No services found. Add your first service to get started.
                </div>
              ) : (
                services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`grid grid-cols-12 gap-2 p-4 items-center ${index !== services.length - 1 ? 'border-b' : ''}`}
                  >
                    <div className="col-span-3">
                      <div className="font-medium">{service.name}</div>
                    </div>

                    <div className="col-span-4">
                      <div className="text-sm text-slate-600 line-clamp-2">
                        {service.description}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <div className="font-medium">${service.price}</div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-slate-500" />
                        {service.duration} min
                      </div>
                    </div>

                    <div className="col-span-2 flex gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Service</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{service.name}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              )}
            </div>
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
