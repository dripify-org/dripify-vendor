'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Search, 
  Filter,
  Edit3,
  Trash2,
  Image as ImageIcon,
  AlertTriangle
} from 'lucide-react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 899,
    discountPrice: 699,
    stock: {
      S: 15,
      M: 8,
      L: 12,
      XL: 5
    },
    totalStock: 40,
    status: 'active',
    lowStock: false
  },
  {
    id: 2,
    name: 'Casual Denim Jeans',
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 1999,
    discountPrice: null,
    stock: {
      '30': 3,
      '32': 2,
      '34': 1,
      '36': 0
    },
    totalStock: 6,
    status: 'active',
    lowStock: true
  },
  {
    id: 3,
    name: 'Running Sports Shoes',
    category: 'Footwear',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 3499,
    discountPrice: 2799,
    stock: {
      '7': 4,
      '8': 6,
      '9': 8,
      '10': 3
    },
    totalStock: 21,
    status: 'active',
    lowStock: false
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 4999,
    discountPrice: null,
    stock: {
      'Black': 0,
      'White': 2,
      'Blue': 1
    },
    totalStock: 3,
    status: 'inactive',
    lowStock: true
  }
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Clothing', 'Footwear', 'Electronics', 'Accessories'];

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Create a new product for your store</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Product description" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input id="price" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">Discount Price (₹)</Label>
                    <Input id="discountPrice" type="number" placeholder="Optional" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload images or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Variants & Stock</Label>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Variant</Label>
                        <Input placeholder="S" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Stock</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Price</Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Variant
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="active" />
                  <Label htmlFor="active">Make product active</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddProductOpen(false)}>
                    Save Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Switch 
                    checked={product.status === 'active'} 
                    size="sm"
                  />
                </div>
                {product.lowStock && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Low Stock
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {product.discountPrice ? (
                      <>
                        <span className="font-bold text-green-600">₹{product.discountPrice}</span>
                        <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                      </>
                    ) : (
                      <span className="font-bold">₹{product.price}</span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Total Stock:</span>
                      <span className={`font-medium ${product.totalStock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.totalStock} units
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(product.stock).map(([variant, stock]) => (
                        <Badge 
                          key={variant} 
                          variant={stock === 0 ? "destructive" : stock < 5 ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {variant}: {stock}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit3 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-2">
                <p className="text-gray-500">No products found</p>
                <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}