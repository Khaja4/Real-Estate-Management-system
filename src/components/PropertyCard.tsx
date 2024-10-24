import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

interface PropertyCardProps {
  property: {
    id: string
    title: string
    price: number
    area: number
    images: string[]
  }
  onAddToFavorites?: (propertyId: string) => void
  onRemoveFromFavorites?: (propertyId: string) => void // Add this line
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onAddToFavorites, onRemoveFromFavorites }) => {
  return (
    <Card>
      <CardHeader>
        <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent>
        <CardTitle>{property.title}</CardTitle>
        <p className="text-2xl font-bold mt-2">${property.price.toLocaleString()}</p>
        <p className="text-muted-foreground">{property.area} sqft</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link to={`/property/${property.id}`}>View Details</Link>
        </Button>
        {onRemoveFromFavorites ? ( // Check if onRemoveFromFavorites is passed
          <Button variant="outline" onClick={() => onRemoveFromFavorites(property.id)}>
            Remove from Favorites
          </Button>
        ) : (
          onAddToFavorites && ( // Otherwise check for onAddToFavorites
            <Button variant="outline" onClick={() => onAddToFavorites(property.id)}>
              Add to Favorites
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  )
}

export default PropertyCard
