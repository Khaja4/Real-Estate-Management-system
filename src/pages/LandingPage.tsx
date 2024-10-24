import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Home as HomeIcon } from 'lucide-react'  // Import the HomeIcon from lucide-react

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <section className="py-12 text-center">
        <HomeIcon className="mx-auto mb-4 h-12 w-12" />  // Use the HomeIcon
        <h1 className="text-4xl font-bold mb-4">Welcome to Housing Hub</h1>
        <p className="text-xl mb-8">Find your dream home or list your property with ease</p>
        <div className="max-w-md mx-auto">
          <form className="flex gap-2">
            <Input type="text" placeholder="Search properties..." className="flex-grow" />
            <Button type="submit">Search</Button>
          </form>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Beautiful Home {i}</CardTitle>
                <CardDescription>3 bed, 2 bath</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={`/placeholder.svg?height=200&width=300`} alt={`Property ${i}`} className="w-full h-48 object-cover mb-4 rounded" />
                <p className="text-2xl font-bold mb-2">$299,000</p>
                <Button asChild className="w-full">
                  <Link to={`/property/${i}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 bg-muted rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Housing Hub Today</h2>
          <p className="mb-8">List your property or find your dream home. It's free and easy to get started!</p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage