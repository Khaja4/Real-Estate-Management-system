import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { addProperty } from '../services/propertyService'
import { useToast } from '../hooks/use-toast'

interface AddPropertyFormData {
  title: string
  description: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  propertyType: string
  location: string
  images: FileList
}

const AddProperty: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddPropertyFormData>()
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = async (data: AddPropertyFormData) => {
    try {
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        if (key === 'images') {
          for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i])
          }
        } else {
          formData.append(key, data[key as keyof AddPropertyFormData].toString())
        }
      })

      await addProperty(formData)
      toast({
        title: "Success",
        description: "Property added successfully.",
      })
      navigate('/my-properties')
    } catch (err) {
      console.error('Failed to add property:', err)
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Property</CardTitle>
        <CardDescription>Fill in the details to list a new property</CardDescription>
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
            <Label htmlFor="propertyType">Property Type</Label>
            <Select onValueChange={(value) => register('propertyType').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select property  type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
            {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType.message}</p>}
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
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              type="file"
              multiple
              {...register('images', { required: 'At least one image is required' })}
            />
            {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
          </div>
          <Button type="submit" className="w-full">Add Property</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddProperty