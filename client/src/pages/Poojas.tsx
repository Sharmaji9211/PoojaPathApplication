import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { poojas } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";

export default function Poojas() {
  const { dispatch } = useApp();

  const handleBookPooja = (pooja: typeof poojas[0]) => {
    dispatch({ type: "SET_SELECTED_POOJA", payload: pooja });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sacred Poojas</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive selection of traditional Hindu poojas, 
            each performed by experienced and verified pandits with authentic rituals
          </p>
        </div>

        {/* Poojas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poojas.map((pooja) => (
            <Card
              key={pooja.id}
              className="hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden group"
              data-testid={`pooja-card-${pooja.id}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={pooja.image}
                  alt={`${pooja.name} ceremony setup`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {pooja.duration && (
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                    <Clock className="w-3 h-3 mr-1" />
                    {pooja.duration}
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pooja.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{pooja.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-saffron-600 font-bold text-xl">
                    ₹{pooja.price.toLocaleString()}
                  </span>
                  <Link href="/booking">
                    <Button
                      onClick={() => handleBookPooja(pooja)}
                      className="bg-saffron-500 hover:bg-saffron-600 transition-colors transform hover:scale-105"
                      data-testid={`book-pooja-${pooja.id}`}
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16">
          <Card className="bg-gradient-saffron-light border-saffron-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Why Choose PoojaPath?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verified Pandits</h3>
                  <p className="text-gray-600 text-sm">All our pandits are thoroughly verified and experienced in traditional rituals</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Flexible Timing</h3>
                  <p className="text-gray-600 text-sm">Book poojas at your convenient time, including early morning and evening slots</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M7 18h10"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Complete Package</h3>
                  <p className="text-gray-600 text-sm">We provide all necessary items and materials for authentic ritual performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
