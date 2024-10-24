import React, { useState, useEffect } from 'react'
import { getAllUsers, deleteUser } from '../services/userService'
import { getProperties, approveProperty, deleteProperty } from '../services/propertyService'
import UserList from '../components/UserList'
import PropertyList from '../components/PropertyList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

interface User {
  id: string
  fullName: string
  email: string
  role: string
}

interface Property {
  id: string
  title: string
  price: number
  area: number
  approved: boolean
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    fetchUsers()
    fetchProperties()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const fetchProperties = async () => {
    try {
      const data = await getProperties()
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    }
  }

  const handledeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId)
      fetchUsers()
    } catch (error) {
      console.error('Failed to remove user:', error)
    }
  }

  const handleApproveProperty = async (propertyId: string) => {
    try {
      await approveProperty(propertyId)
      fetchProperties()
    } catch (error) {
      console.error('Failed to approve property:', error)
    }
  }

  const handleRemoveProperty = async (propertyId: string) => {
    try {
      await deleteProperty(propertyId)
      fetchProperties()
    } catch (error) {
      console.error('Failed to remove property:', error)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserList users={users} ondeleteUser={handledeleteUser} />
        </TabsContent>
        <TabsContent value="properties">
          <PropertyList
            properties={properties}
            onApproveProperty={handleApproveProperty}
            onRemoveProperty={handleRemoveProperty}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard