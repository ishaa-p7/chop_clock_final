"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Plus, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { fetchShop, fetchServices, createService } from "@/lib/api"

export default function AdminServices() {
  const router = useRouter()
  const [services, setServices] = useState<any[]>([])
  const [shop, setShop] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [shopData, servicesData] = await Promise.all([
          fetchShop(),
          fetchServices()
        ])
        setShop(shopData)
        setServices(servicesData)
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Failed to fetch services and shop details",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAddService = async () => {
    if (!shop?.id) {
      toast({
        title: "Shop not loaded",
        description: "Please wait for shop data to load",
        variant: "destructive"
      })
      return
    }

    if (!newService.name || !newService.description || !newService.price || !newService.duration) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    try {
      const service = await createService({
        name: newService.name,
        description: newService.description,
        price: parseFloat(newService.price),
        duration: parseInt(newService.duration),
        shopId: shop.id // Add shopId from fetched shop data
      })

      setServices([...services, service])
      setNewService({ name: "", description: "", price: "", duration: "" })
      setIsAddDialogOpen(false)

      toast({
        title: "Service added",
        description: `${service.name} has been added to your services.`,
      })
    } catch (error) {
      toast({
        title: "Error creating service",
        description: "Failed to save service to the server",
        variant: "destructive"
      })
    }
  }

  if (loading) return <div className="text-center p-8">Loading...</div>
  if (!shop) return <div className="text-center p-8">Shop not found</div>

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
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-blue-700">
                  View Site
                </Button>
              </Link>
              <Button variant="secondary">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* ... (rest of the JSX remains the same) ... */}
      </main>

      <footer className="bg-blue-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200">
            © {new Date().getFullYear()} {shop.name} Admin Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}