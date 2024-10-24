import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'

interface Inquiry {
  id: string
  propertyId: string
  buyerName: string
  message: string
  createdAt: string
}

interface InquiryListProps {
  inquiries: Inquiry[]
}

const InquiryList: React.FC<InquiryListProps> = ({ inquiries }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property ID</TableHead>
          <TableHead>Buyer Name</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inquiries.map((inquiry) => (
          <TableRow key={inquiry.id}>
            <TableCell>{inquiry.propertyId}</TableCell>
            <TableCell>{inquiry.buyerName}</TableCell>
            <TableCell>{inquiry.message}</TableCell>
            <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <Button>Reply</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default InquiryList