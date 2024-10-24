import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Home, User, Building, Search, PlusCircle, List } from 'lucide-react'

const HomePage: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  const roleSpecificFeatures = () => {
    switch (user.role) {
      case 'BUYER':
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Search Properties</CardTitle>
                <CardDescription>Find your dream home</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/search-properties"><Search className="mr-2 h-4 w-4" /> Search Properties</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>My Favorites</CardTitle>
                <CardDescription>View your saved properties</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/favorites"><List className="mr-2 h-4 w-4" /> View Favorites</Link>
                </Button>
              </CardContent>
            </Card>
          </>
        )
      case 'SELLER':
      case 'AGENT':
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle>My Properties</CardTitle>
                <CardDescription>Manage your listed properties</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full mb-2">
                  <Link to="/my-properties"><Building className="mr-2 h-4 w-4" /> View My Properties</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/add-property"><PlusCircle className="mr-2 h-4 w-4" /> Add New Property</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Inquiries</CardTitle>
                <CardDescription>Manage property inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/inquiries"><List className="mr-2 h-4 w-4" /> View Inquiries</Link>
                </Button>
              </CardContent>
            </Card>
          </>
        )
      case 'ADMIN':
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage Housing Hub users</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/users"><User className="mr-2 h-4 w-4" /> Manage Users</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>Oversee all properties</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/properties"><Building className="mr-2 h-4 w-4" /> Manage Properties</Link>
                </Button>
              </CardContent>
            </Card>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.fullName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>View and edit your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/profile"><User className="mr-2 h-4 w-4" /> View Profile</Link>
            </Button>
          </CardContent>
        </Card>
        {roleSpecificFeatures()}
      </div>
    </div>
  )
}

export default HomePage