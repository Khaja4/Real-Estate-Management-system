import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { getPropertyById, updateProperty } from '../services/propertyService'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { toast } from '@/hooks/use-toast'

interface EditPropertyFormData {
  title: string
  description: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  location: string
  images: FileList
}

const EditProperty: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<EditPropertyFormData>()
  const history = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchProperty()
    }
  }, [id])

  const fetchProperty = async () => {
    try {
      if (!id) return // Check if id is available
      const property = await getPropertyById(id)
      Object.keys(property).forEach(key => {
        if (key !== 'images') {
          setValue(key as keyof EditPropertyFormData, property[key as keyof typeof property])
        }
      })
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch property:', error)
      toast({
        title: "Failed to load property",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const onSubmit = async (data: EditPropertyFormData) => {
    try {
      if (!id) return // Ensure id is available before updating
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        if (key === 'images') {
          for (const element of data.images) {
            formData.append('images', element)
          }
        } else {
          formData.append(key, data[key as keyof EditPropertyFormData].toString())
        }
      })

      await updateProperty(id, formData)
      toast({
        title: "Property updated successfully",
        description: "Your property details have been updated.",
      })
      history('/seller-dashboard')
    } catch (err) {
      toast({
        title: "Failed to update property",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Property</CardTitle>
        <CardDescription>Update the details of your property</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                {...register('price', { required: 'Price is required', min: 0 })}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area (sqft)</Label>
              <Input
                id="area"
                type="number"
                {...register('area', { required: 'Area is required', min: 0 })}
              />
              {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                {...register('bedrooms', { required: 'Number of bedrooms is required', min: 0 })}
              />
              {errors.bedrooms && <p className="text-red-500 text-sm">{errors.bedrooms.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                {...register('bathrooms', { required: 'Number of bathrooms is required', min: 0 })}
              />
              {errors.bathrooms && <p className="text-red-500 text-sm">{errors.bathrooms.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register('location', { required: 'Location is required' })}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Add New Images (optional)</Label>
            <Input
              id="images"
              type="file"
              multiple
              {...register('images')}
            />
          </div>
          <Button type="submit" className="w-full">Update Property</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditProperty
