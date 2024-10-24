import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import PropertyCard from '../components/PropertyCard';

// Define the interface for the property object
interface Property {
  id: string;
  title: string;
  price: number;
  area: number;
  images: string[];
}

// Define the interface for the search form data
interface SearchFormData {
  keyword: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
}

const SearchProperties: React.FC = () => {
  const { register, handleSubmit } = useForm<SearchFormData>();
  // Specify the type for searchResults
  const [searchResults, setSearchResults] = useState<Property[]>([]);

  const onSubmit = (data: SearchFormData) => {
    // TODO: Implement actual search logic here
    console.log('Search data:', data);
    // For now, we'll just set some dummy results
    setSearchResults([
      { id: '1', title: 'Cozy Apartment', price: 250000, area: 1000, images: ['/placeholder.svg'] },
      { id: '2', title: 'Spacious House', price: 500000, area: 2000, images: ['/placeholder.svg'] },
      { id: '3', title: 'Modern Condo', price: 350000, area: 1500, images: ['/placeholder.svg'] },
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Properties</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Input id="keyword" {...register('keyword')} placeholder="Enter keywords..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Select onValueChange={(value) => register('propertyType').onChange({ target: { value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minPrice">Min Price</Label>
                <Input id="minPrice" type="number" {...register('minPrice')} placeholder="Minimum price" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPrice">Max Price</Label>
                <Input id="maxPrice" type="number" {...register('maxPrice')} placeholder="Maximum price" />
              </div>
            </div>
            <Button type="submit" className="w-full">Search</Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SearchProperties;
