import React, { useState, useEffect } from 'react'
import { getProperties, addToFavorites } from '../services/propertyService'
import PropertyCard from '../components/PropertyCard'

interface Property {
  id: string
  title: string
  price: number
  area: number
  images: string[]
}

const BuyerDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const data = await getProperties()
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    }
  }

  const handleAddToFavorites = async (propertyId: string) => {
    try {
      await addToFavorites(propertyId)
      // Update UI or show a success message
    } catch (error) {
      console.error('Failed to add to favorites:', error)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onAddToFavorites={handleAddToFavorites}
          />
        ))}
      </div>
    </div>
  )
}

export default BuyerDashboard