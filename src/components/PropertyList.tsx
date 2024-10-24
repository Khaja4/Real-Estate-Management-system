import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'

interface Property {
  id: string
  title: string
  price: number
  area: number
  approved: boolean
}

interface PropertyListProps {
  properties: Property[]
  onApproveProperty: (propertyId: string) => void
  onRemoveProperty: (propertyId: string) => void
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onApproveProperty, onRemoveProperty }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.title}</TableCell>
            <TableCell>${property.price.toLocaleString()}</TableCell>
            <TableCell>{property.area} sqft</TableCell>
            <TableCell>{property.approved ? 'Approved' : 'Pending'}</TableCell>
            <TableCell>
              {!property.approved && (
                <Button onClick={() => onApproveProperty(property.id)} className="mr-2">
                  Approve
                </Button>
              )}
              <Button variant="destructive" onClick={() => onRemoveProperty(property.id)}>
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PropertyList