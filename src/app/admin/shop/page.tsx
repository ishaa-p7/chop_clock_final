"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Scissors, Save, Clock, MapPin, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { shop } from "@/lib/data"

export default function AdminShop() {
  const router = useRouter()

  const [shopData, setShopData] = useState({
    name: shop.name,
    tagline: shop.tagline,
    location: shop.location,
    description: shop.description,
    phone: shop.phone,
    hours: shop.hours,
    rating: shop.rating.toString(),
    reviewCount: shop.reviewCount.toString(),
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShopData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Validation
    if (
      !shopData.name ||
      !shopData.tagline ||
      !shopData.location ||
      !shopData.description ||
      !shopData.phone ||
      !shopData.hours
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to the database
    console.log("Saving shop data:", shopData)

    toast({
      title: "Shop details updated",
      description: "Your shop information has been successfully updated.",
    })
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Shop Details</h1>
            <p className="text-slate-600">Manage your barber shop information</p>
          </div>
          <Button variant="ghost" className="text-blue-600" onClick={() => router.push("/admin")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>

        <Tabs defaultValue="edit">
          <TabsList className="mb-6">
            <TabsTrigger value="edit">Edit Details</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Shop Information</CardTitle>
                <CardDescription>Update your shop details that will be displayed to customers</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Shop Name</Label>
                      <Input id="name" name="name" value={shopData.name} onChange={handleInputChange} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        name="tagline"
                        value={shopData.tagline}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="text-xs text-slate-500">A short slogan that describes your shop</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={shopData.description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                    <p className="text-xs text-slate-500">Detailed description of your barber shop</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={shopData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={shopData.phone} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Working Hours</Label>
                    <Input id="hours" name="hours" value={shopData.hours} onChange={handleInputChange} required />
                    <p className="text-xs text-slate-500">e.g. Mon-Fri: 9AM-7PM, Sat: 9AM-5PM, Sun: Closed</p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating (1-5)</Label>
                      <Input
                        id="rating"
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={shopData.rating}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reviewCount">Number of Reviews</Label>
                      <Input
                        id="reviewCount"
                        name="reviewCount"
                        type="number"
                        min="0"
                        value={shopData.reviewCount}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Shop Preview</CardTitle>
                <CardDescription>This is how your shop information will appear to customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg border p-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-blue-800">{shopData.name}</h2>
                    <p className="text-lg text-slate-600 mt-1">{shopData.tagline}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-slate-600">{shopData.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Contact</h3>
                        <p className="text-slate-600">{shopData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Hours</h3>
                        <p className="text-slate-600">{shopData.hours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">About Us</h3>
                    <p className="text-slate-600">{shopData.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Number.parseFloat(shopData.rating) ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-600">{shopData.rating} out of 5</span>
                    <span className="text-slate-500">({shopData.reviewCount} reviews)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

