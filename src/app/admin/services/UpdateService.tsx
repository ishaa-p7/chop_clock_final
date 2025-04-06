'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

type ServiceFormData = {
    name: string
    description: string
    price: number
    duration: number
}

function UpdateService({ service, fetchServices }: any) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ServiceFormData>({
        defaultValues: {
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration,
        },
    })

    const onSubmit = async (data: ServiceFormData) => {
        try {
            setLoading(true)

            const res = await fetch(`/api/services/${service.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error('Failed to update service')

            toast({
                title: 'Service Updated',
                description: `${data.name} has been updated successfully.`,
            })

            await fetchServices()
            setOpen(false)
        } catch (error: any) {
            toast({
                title: 'Update Failed',
                description: 'Something went wrong while updating the service.',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDialogChange = (state: boolean) => {
        setOpen(state)
        if (!state) reset()
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Service</DialogTitle>
                    <DialogDescription>Edit the service details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className="col-span-3"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-sm ml-[33%]">{errors.name.message}</p>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            {...register('description', { required: 'Description is required' })}
                            className="col-span-3"
                        />
                    </div>
                    {errors.description && (
                        <p className="text-red-500 text-sm ml-[33%]">{errors.description.message}</p>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            {...register('price', {
                                required: 'Price is required',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Price must be non-negative' },
                            })}
                            className="col-span-3"
                        />
                    </div>
                    {errors.price && (
                        <p className="text-red-500 text-sm ml-[33%]">{errors.price.message}</p>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                            Duration (minutes)
                        </Label>
                        <Input
                            id="duration"
                            type="number"
                            {...register('duration', {
                                required: 'Duration is required',
                                valueAsNumber: true,
                                min: { value: 1, message: 'Duration must be at least 1 minute' },
                            })}
                            className="col-span-3"
                        />
                    </div>
                    {errors.duration && (
                        <p className="text-red-500 text-sm ml-[33%]">{errors.duration.message}</p>
                    )}

                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateService
