import React, { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import { getFavoriteProperties, removeFromFavorites } from '../services/propertyService'
import { useToast } from '../hooks/use-toast'

interface Property {
  id: string
  title: string
  price: number
  area: number
  images: string[]
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Property[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const data = await getFavoriteProperties()
      setFavorites(data)
    } catch (error) {
      console.error('Failed to fetch favorites:', error)
      toast({
        title: "Error",
        description: "Failed to load favorite properties. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromFavorites = async (propertyId: string) => {
    try {
      await removeFromFavorites(propertyId)
      setFavorites(favorites.filter(prop => prop.id !== propertyId))
      toast({
        title: "Success",
        description: "Property removed from favorites.",
      })
    } catch (error) {
      console.error('Failed to remove from favorites:', error)
      toast({
        title: "Error",
        description: "Failed to remove property from favorites. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorite Properties</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any properties to your favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onRemoveFromFavorites={() => handleRemoveFromFavorites(property.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites