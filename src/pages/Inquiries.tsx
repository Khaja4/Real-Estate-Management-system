import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' // Import useParams if using route parameters
import { getInquiriesForProperty, respondToInquiry } from '../services/inquiryService'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Textarea } from '../components/ui/textarea'
import { useToast } from '../hooks/use-toast'

interface Inquiry {
  id: string
  propertyId: string
  propertyTitle: string
  buyerName: string
  message: string
  createdAt: string
  status: 'PENDING' | 'RESPONDED'
}

const Inquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [responses, setResponses] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()
  const { propertyId } = useParams<{ propertyId: string }>() // Get propertyId from route parameters

  useEffect(() => {
    fetchInquiries()
  }, [propertyId]) // Fetch inquiries whenever propertyId changes

  const fetchInquiries = async () => {
    if (!propertyId) return; // Ensure propertyId is available
    try {
      const data = await getInquiriesForProperty(propertyId)
      setInquiries(data)
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
      toast({
        title: "Error",
        description: "Failed to load inquiries. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleResponseChange = (inquiryId: string, response: string) => {
    setResponses({ ...responses, [inquiryId]: response })
  }

  const handleSubmitResponse = async (inquiryId: string) => {
    try {
      await respondToInquiry(inquiryId, responses[inquiryId])
      setInquiries(inquiries.map(inq => 
        inq.id === inquiryId ? { ...inq, status: 'RESPONDED' } : inq
      ))
      toast({
        title: "Success",
        description: "Response sent successfully.",
      })
    } catch (error) {
      console.error('Failed to send response:', error)
      toast({
        title: "Error",
        description: "Failed to send response. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Property Inquiries</h1>
      {inquiries.length === 0 ? (
        <p>No inquiries at the moment.</p>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader>
                <CardTitle>{inquiry.propertyTitle}</CardTitle>
                <CardDescription>From: {inquiry.buyerName} on {new Date(inquiry.createdAt).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{inquiry.message}</p>
                {inquiry.status === 'PENDING' && (
                  <Textarea
                    placeholder="Type your response here..."
                    value={responses[inquiry.id] || ''}
                    onChange={(e) => handleResponseChange(inquiry.id, e.target.value)}
                  />
                )}
              </CardContent>
              <CardFooter>
                {inquiry.status === 'PENDING' ? (
                  <Button onClick={() => handleSubmitResponse(inquiry.id)} disabled={!responses[inquiry.id]}>
                    Send Response
                  </Button>
                ) : (
                  <p className="text-green-600">Responded</p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Inquiries
