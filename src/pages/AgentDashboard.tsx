import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPropertiesByAgent } from '../services/propertyService'
import { getInquiriesForAgent } from '../services/inquiryService'
import PropertyCard from '../components/PropertyCard'
import InquiryList from '../components/InquiryList'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

interface Property {
  id: string
  title: string
  price: number
  area: number
  images: string[]
}

interface Inquiry {
  id: string
  propertyId: string
  buyerName: string
  message: string
  createdAt: string
}

const AgentDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])

  useEffect(() => {
    fetchProperties()
    fetchInquiries()
  }, [])

  const fetchProperties = async () => {
    try {
      const data = await getPropertiesByAgent()
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    }
  }

  const fetchInquiries = async () => {
    try {
      const data = await getInquiriesForAgent()
      setInquiries(data)
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Agent Dashboard</h2>
        <Button asChild>
          <Link to="/add-property">Add New Property</Link>
        </Button>
      </div>
      <Tabs defaultValue="properties">
        <TabsList>
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
        </TabsList>
        <TabsContent value="properties">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="inquiries">
          <InquiryList inquiries={inquiries} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AgentDashboard