import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPropertyById } from '../services/propertyService'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel'

interface Property {
  id: string
  title: string
  description: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  location: string
  images: string[]
  sellerId: string
}

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Extract id from useParams
  const [property, setProperty] = useState<Property | null>(null)
  const { user } = useAuth()

  // Update effect to check if id exists before calling fetchProperty
  useEffect(() => {
    if (id) {
      fetchProperty()
    }
  }, [id])

  // Fetch property details only if id is available
  const fetchProperty = async () => {
    try {
      if (!id) return; // Handle undefined id
      const data = await getPropertyById(id)
      setProperty(data)
    } catch (error) {
      console.error('Failed to fetch property details:', error)
    }
  }

  if (!property) {
    return <div>Loading...</div>
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{property.title}</CardTitle>
        <CardDescription>{property.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-xl mx-auto">
          <CarouselContent>
            {property.images.map((image, index) => (
              <CarouselItem key={index}>
                <img src={image} alt={`Property ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mt-6 space-y-4">
          <p className="text-2xl font-bold">${property.price.toLocaleString()}</p>
          <p>{property.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Area:</strong> {property.area} sqft
            </div>
            <div>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </div>
            <div>
              <strong>Bathrooms:</strong> {property.bathrooms}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {user && user.id !== property.sellerId && (
          <Button>Contact Seller</Button>
        )}
        {user && (user.id === property.sellerId || user.role === 'ADMIN') && (
          <Button asChild variant="outline">
            <Link to={`/edit-property/${property.id}`}>Edit Property</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default PropertyDetails
