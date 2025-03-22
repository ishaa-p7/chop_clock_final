import { Trophy, Scissors, Clock, Users } from "lucide-react"
export interface Service {
    id: string
    name: string
    description: string
    price: number
    duration: number
  }
  
  // Review data
  export interface Review {
    id: string
    name: string
    rating: number
    comment: string
    date: string
  }

export interface Shop {
    id: string
    name: string
    tagline: string
    location: string
    description: string
    phone: string
    hours: string
    rating: number
    reviewCount: number
    services: Service[]
    reviews: Review[]
    features: {
      icon: any
      title: string
      description: string
    }[]
  }
  
  // Single shop data
  export const shop: Shop = {
    id: "shop1",
    name: "Premium Cuts Barber",
    tagline: "Where style meets precision",
    location: "123 Main Street, Downtown, City",
    description:
      "Premium Cuts is a modern barber shop offering top-quality haircuts and grooming services. Our skilled barbers provide precision cuts in a relaxed atmosphere.",
    phone: "(555) 123-4567",
    hours: "Mon-Fri: 9AM-7PM, Sat: 9AM-5PM, Sun: Closed",
    rating: 4.8,
    reviewCount: 156,
    services: [
      {
        id: "service1",
        name: "Classic Haircut",
        description: "Precision haircut with styling",
        price: 25,
        duration: 30,
      },
      {
        id: "service2",
        name: "Beard Trim",
        description: "Shape and trim your beard",
        price: 15,
        duration: 20,
      },
      {
        id: "service3",
        name: "Hot Towel Shave",
        description: "Traditional straight razor shave with hot towel",
        price: 35,
        duration: 45,
      },
      {
        id: "service4",
        name: "Hair & Beard Combo",
        description: "Haircut with beard trim and styling",
        price: 40,
        duration: 50,
      },
      {
        id: "service5",
        name: "Kid's Haircut",
        description: "Haircut for children under 12",
        price: 18,
        duration: 25,
      },
      {
        id: "service6",
        name: "Hair Coloring",
        description: "Professional hair coloring service",
        price: 55,
        duration: 60,
      },
      {
        id: "service7",
        name: "Luxury Grooming Package",
        description: "Haircut, beard trim, facial, and scalp massage",
        price: 75,
        duration: 90,
      },
      {
        id: "service8",
        name: "Hair Styling",
        description: "Professional styling without a haircut",
        price: 20,
        duration: 25,
      },
    ],
    reviews: [
      {
        id: "review1",
        name: "John D.",
        rating: 5,
        comment: "Best haircut I've had in years. Very attentive to detail and the hot towel shave was amazing.",
        date: "2023-05-15",
      },
      {
        id: "review2",
        name: "Mike T.",
        rating: 4,
        comment: "Great atmosphere and skilled barbers. Slightly pricey but worth it for the quality service.",
        date: "2023-04-22",
      },
      {
        id: "review3",
        name: "David L.",
        rating: 5,
        comment: "The luxury grooming package is worth every penny. Felt like a new man afterward.",
        date: "2023-03-10",
      },
    ],
    features: [
      {
        icon: Trophy,
        title: "Premium Service",
        description: "Award-winning barbers with years of experience",
      },
      {
        icon: Scissors,
        title: "Quality Tools",
        description: "We use only the finest tools and products",
      },
      {
        icon: Clock,
        title: "Efficient Service",
        description: "Respect for your time with punctual appointments",
      },
      {
        icon: Users,
        title: "Satisfied Clients",
        description: "Join our community of happy customers",
      },
    ],
  }