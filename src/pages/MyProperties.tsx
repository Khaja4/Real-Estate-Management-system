import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPropertiesBySeller, deleteProperty } from '../services/propertyService' // Changed here
import { Button } from '../components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { useToast } from '../hooks/use-toast'

interface Property {
  id: string
  title: string
  price: number
  area: number
  images: string[]
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

const MyProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const data = await getPropertiesBySeller() // Updated function call
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch properties:', error)
      toast({
        title: "Error",
        description: "Failed to load your properties. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProperty = async (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(propertyId)
        setProperties(properties.filter(prop => prop.id !== propertyId))
        toast({
          title: "Success",
          description: "Property deleted successfully.",
        })
      } catch (error) {
        console.error('Failed to delete property:', error)
        toast({
          title: "Error",
          description: "Failed to delete property. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Button asChild>
          <Link to="/add-property">Add New Property</Link>
        </Button>
      </div>
      {properties.length === 0 ? (
        <p>You haven't listed any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover mb-4 rounded" />
                <p className="text-2xl font-bold mb-2">${property.price.toLocaleString()}</p>
                <p>{property.area} sqft</p>
                <p className="mt-2">Status: {property.status}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link to={`/edit-property/${property.id}`}>Edit</Link>
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteProperty(property.id)}>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProperties
