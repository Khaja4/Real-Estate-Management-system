import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPropertiesBySeller } from '../services/propertyService'
import PropertyCard from '../components/PropertyCard'
import { Button } from '../components/ui/button'

interface Property {
  id: string
  title: string
  price: number
  area: number
  images: string[]
}

const SellerDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const data = await getPropertiesBySeller()
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Properties</h2>
        <Button asChild>
          <Link to="/add-property">Add New Property</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

export default SellerDashboard