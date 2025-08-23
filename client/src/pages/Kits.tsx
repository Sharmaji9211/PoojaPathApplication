import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { kits } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Kits() {
  const { dispatch } = useApp();
  const { toast } = useToast();

  const handleAddToCart = (kit: typeof kits[0]) => {
    if (!kit.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    const cartItem = {
      id: Date.now().toString(),
      kitId: kit.id,
      kitName: kit.name,
      price: kit.price,
      quantity: 1,
      image: kit.image,
    };
    
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
    
    toast({
      title: "Added to Cart",
      description: `${kit.name} has been added to your cart.`,
    });
  };

  const categories = [...new Set(kits.map(kit => kit.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Puja Kits & Essentials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Authentic puja items and complete kits for your spiritual needs. 
            All items are blessed and sourced from trusted suppliers
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="px-4 py-2 text-sm">
              {category}
            </Badge>
          ))}
        </div>

        {/* Kits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {kits.map((kit) => (
            <Card
              key={kit.id}
              className="hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden group"
              data-testid={`kit-card-${kit.id}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={kit.image}
                  alt={kit.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge 
                  className={`absolute top-4 right-4 ${
                    kit.inStock 
                      ? "bg-green-500 hover:bg-green-600" 
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {kit.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {kit.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{kit.name}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{kit.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-saffron-600 font-bold text-xl">
                    ₹{kit.price.toLocaleString()}
                  </span>
                </div>
                <Button
                  onClick={() => handleAddToCart(kit)}
                  disabled={!kit.inStock}
                  className="w-full bg-saffron-500 hover:bg-saffron-600 transition-colors transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid={`add-to-cart-${kit.id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {kit.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <Card className="bg-gradient-saffron-light border-saffron-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Why Buy From PoojaPath?
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Authentic Items</h3>
                  <p className="text-gray-600 text-xs">Genuine brass and traditional materials</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Fast Delivery</h3>
                  <p className="text-gray-600 text-xs">Quick and secure packaging</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Blessed Items</h3>
                  <p className="text-gray-600 text-xs">All items are blessed before shipping</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Secure Payment</h3>
                  <p className="text-gray-600 text-xs">Safe and encrypted transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
