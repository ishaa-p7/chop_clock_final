import { Trophy, Scissors, Clock, Users } from 'lucide-react'
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
    id: 'shop1',
    name: 'Premium Cuts Barber',
    tagline: 'Where style meets precision',
    location: '123 Main Street, Downtown, City',
    description:
        'Premium Cuts is a modern barber shop offering top-quality haircuts and grooming services. Our skilled barbers provide precision cuts in a relaxed atmosphere.',
    phone: '(555) 123-4567',
    hours: 'Mon-Fri: 9AM-7PM, Sat: 9AM-5PM, Sun: Closed',
    rating: 4.8,
    reviewCount: 156,
    services: [
        {
            id: 'service1',
            name: 'Classic Haircut',
            description: 'Precision haircut with styling',
            price: 25,
            duration: 30,
        },
        {
            id: 'service2',
            name: 'Beard Trim',
            description: 'Shape and trim your beard',
            price: 15,
            duration: 20,
        },
        {
            id: 'service3',
            name: 'Hot Towel Shave',
            description: 'Traditional straight razor shave with hot towel',
            price: 35,
            duration: 45,
        },
        {
            id: 'service4',
            name: 'Hair & Beard Combo',
            description: 'Haircut with beard trim and styling',
            price: 40,
            duration: 50,
        },
        {
            id: 'service5',
            name: "Kid's Haircut",
            description: 'Haircut for children under 12',
            price: 18,
            duration: 25,
        },
        {
            id: 'service6',
            name: 'Hair Coloring',
            description: 'Professional hair coloring service',
            price: 55,
            duration: 60,
        },
        {
            id: 'service7',
            name: 'Luxury Grooming Package',
            description: 'Haircut, beard trim, facial, and scalp massage',
            price: 75,
            duration: 90,
        },
        {
            id: 'service8',
            name: 'Hair Styling',
            description: 'Professional styling without a haircut',
            price: 20,
            duration: 25,
        },
    ],
    reviews: [
        {
            id: 'review1',
            name: 'John D.',
            rating: 5,
            comment:
                "Best haircut I've had in years. Very attentive to detail and the hot towel shave was amazing.",
            date: '2023-05-15',
        },
        {
            id: 'review2',
            name: 'Mike T.',
            rating: 4,
            comment:
                'Great atmosphere and skilled barbers. Slightly pricey but worth it for the quality service.',
            date: '2023-04-22',
        },
        {
            id: 'review3',
            name: 'David L.',
            rating: 5,
            comment:
                'The luxury grooming package is worth every penny. Felt like a new man afterward.',
            date: '2023-03-10',
        },
    ],
    features: [
        {
            icon: Trophy,
            title: 'Premium Service',
            description: 'Award-winning barbers with years of experience',
        },
        {
            icon: Scissors,
            title: 'Quality Tools',
            description: 'We use only the finest tools and products',
        },
        {
            icon: Clock,
            title: 'Efficient Service',
            description: 'Respect for your time with punctual appointments',
        },
        {
            icon: Users,
            title: 'Satisfied Clients',
            description: 'Join our community of happy customers',
        },
    ],
}

export interface Appointment {
    id: string
    customerName: string
    customerEmail: string
    customerPhone: string
    date: string
    time: string
    service: string
    serviceId: string
    price: number
    duration: number
    status: 'pending' | 'completed' | 'cancelled'
}

// Mock appointments
export function getAppointments(): Appointment[] {
    return [
        {
            id: 'apt1',
            customerName: 'John Smith',
            customerEmail: 'john@example.com',
            customerPhone: '(555) 111-2222',
            date: '2023-06-15',
            time: '10:00 AM',
            service: 'Classic Haircut',
            serviceId: 'service1',
            price: 25,
            duration: 30,
            status: 'completed',
        },
        {
            id: 'apt2',
            customerName: 'Michael Johnson',
            customerEmail: 'michael@example.com',
            customerPhone: '(555) 333-4444',
            date: '2023-06-15',
            time: '2:30 PM',
            service: 'Luxury Grooming Package',
            serviceId: 'service7',
            price: 75,
            duration: 90,
            status: 'pending',
        },
        {
            id: 'apt3',
            customerName: 'David Williams',
            customerEmail: 'david@example.com',
            customerPhone: '(555) 555-6666',
            date: '2023-06-16',
            time: '11:00 AM',
            service: 'Hair & Beard Combo',
            serviceId: 'service4',
            price: 40,
            duration: 50,
            status: 'pending',
        },
        {
            id: 'apt4',
            customerName: 'Robert Brown',
            customerEmail: 'robert@example.com',
            customerPhone: '(555) 777-8888',
            date: '2023-06-16',
            time: '3:00 PM',
            service: 'Hot Towel Shave',
            serviceId: 'service3',
            price: 35,
            duration: 45,
            status: 'pending',
        },
        {
            id: 'apt5',
            customerName: 'James Davis',
            customerEmail: 'james@example.com',
            customerPhone: '(555) 999-0000',
            date: '2023-06-17',
            time: '1:00 PM',
            service: 'Classic Haircut',
            serviceId: 'service1',
            price: 25,
            duration: 30,
            status: 'pending',
        },
        {
            id: 'apt6',
            customerName: 'Thomas Miller',
            customerEmail: 'thomas@example.com',
            customerPhone: '(555) 123-9876',
            date: '2023-06-17',
            time: '4:30 PM',
            service: 'Hair Coloring',
            serviceId: 'service6',
            price: 55,
            duration: 60,
            status: 'cancelled',
        },
        {
            id: 'apt7',
            customerName: 'William Wilson',
            customerEmail: 'william@example.com',
            customerPhone: '(555) 456-7890',
            date: '2023-06-18',
            time: '9:30 AM',
            service: 'Hair & Beard Combo',
            serviceId: 'service4',
            price: 40,
            duration: 50,
            status: 'pending',
        },
        {
            id: 'apt8',
            customerName: 'Daniel Taylor',
            customerEmail: 'daniel@example.com',
            customerPhone: '(555) 987-6543',
            date: '2023-06-18',
            time: '2:00 PM',
            service: 'Beard Trim',
            serviceId: 'service2',
            price: 15,
            duration: 20,
            status: 'pending',
        },
    ]
}

export const getShopById = (id: string): Shop | undefined => {
    if (shop.id === id) {
        return shop
    }
    return undefined
}
