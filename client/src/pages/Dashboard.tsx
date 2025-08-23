import { useState } from "react";
import { Clock, ShoppingBag, Star, Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { pandits, poojas, kits } from "@/data/mockData";
import { Link } from "wouter";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const { state, dispatch } = useApp();

  const upcomingBookings = state.bookings.filter(booking => 
    booking.status === "confirmed" || booking.status === "pending"
  );
  
  const pastBookings = state.bookings.filter(booking => 
    booking.status === "completed"
  );

  const handleAddToCart = (kit: typeof kits[0]) => {
    const cartItem = {
      id: Date.now().toString(),
      kitId: kit.id,
      kitName: kit.name,
      price: kit.price,
      quantity: 1,
      image: kit.image,
    };
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  const handleBookPooja = (pooja: typeof poojas[0]) => {
    dispatch({ type: "SET_SELECTED_POOJA", payload: pooja });
  };

  const tabs = [
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "pandits", label: "Browse Pandits", icon: Star },
    { id: "poojas", label: "Browse Poojas", icon: Clock },
    { id: "kits", label: "Browse Kits", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-saffron rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span data-testid="welcome-user-name">{state.user?.name}</span>!
          </h1>
          <p className="text-saffron-100">Manage your bookings, orders, and explore our services</p>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 border-b-2 py-4 px-2 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "border-saffron-500 text-saffron-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    data-testid={`dashboard-tab-${tab.id}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === "bookings" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-5 h-5 text-saffron-500 mr-2" />
                  Upcoming Bookings
                </h3>
                
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-saffron-100 rounded-lg p-4 hover:bg-saffron-50 transition-colors"
                        data-testid={`upcoming-booking-${booking.id}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{booking.poojaName}</h4>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Date: {booking.date}</p>
                        <p className="text-sm text-gray-600 mb-2">Time: {booking.time}</p>
                        <p className="text-sm text-gray-600">{booking.address}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8" data-testid="no-upcoming-bookings">
                    No upcoming bookings. Book a puja to get started!
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Past Bookings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                  Past Bookings
                </h3>
                
                {pastBookings.length > 0 ? (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-4"
                        data-testid={`past-booking-${booking.id}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{booking.poojaName}</h4>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Date: {booking.date}</p>
                        <p className="text-sm text-gray-600">⭐⭐⭐⭐⭐</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8" data-testid="no-past-bookings">
                    No past bookings yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "orders" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Package className="w-5 h-5 text-saffron-500 mr-2" />
                Recent Orders
              </h3>
              
              {state.orders.length > 0 ? (
                <div className="space-y-4">
                  {state.orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-saffron-100 rounded-lg p-4 hover:bg-saffron-50 transition-colors"
                      data-testid={`order-${order.id}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">
                          Order #{order.id.slice(-6)}
                        </h4>
                        <Badge variant={
                          order.status === "delivered" ? "default" :
                          order.status === "shipped" ? "secondary" : "outline"
                        }>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Items: {order.items.map(item => item.kitName).join(", ")}
                      </p>
                      <p className="text-sm text-gray-600">Amount: ₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8" data-testid="no-orders">
                  No orders yet. Browse our kits to place your first order!
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "pandits" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...pandits, ...state.registeredPandits].map((pandit) => (
              <Card key={pandit.id} className="hover:shadow-xl transition-shadow" data-testid={`pandit-card-${pandit.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={pandit.image}
                    alt={`${pandit.name} - experienced priest`}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pandit.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {"⭐".repeat(Math.floor(pandit.rating))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({pandit.rating}/5 • {pandit.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Experience: {pandit.experience}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Specializes in: {pandit.specialties.join(", ")}
                  </p>
                  <p className="text-sm text-saffron-600 font-medium mb-4">
                    Available: {pandit.availability}
                  </p>
                  <Button 
                    className="w-full bg-saffron-500 hover:bg-saffron-600 transition-colors"
                    data-testid={`select-pandit-${pandit.id}`}
                  >
                    Select Pandit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "poojas" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poojas.map((pooja) => (
              <Card key={pooja.id} className="hover:shadow-xl transition-all transform hover:-translate-y-2" data-testid={`dashboard-pooja-card-${pooja.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={pooja.image}
                    alt={`${pooja.name} ceremony`}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pooja.name}</h3>
                  <p className="text-gray-600 mb-4">{pooja.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-saffron-600 font-semibold text-lg">
                      ₹{pooja.price.toLocaleString()}
                    </span>
                    <Link href="/booking">
                      <Button
                        onClick={() => handleBookPooja(pooja)}
                        className="bg-saffron-500 hover:bg-saffron-600 transition-colors"
                        data-testid={`dashboard-book-pooja-${pooja.id}`}
                      >
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "kits" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kits.map((kit) => (
              <Card key={kit.id} className="hover:shadow-xl transition-all transform hover:-translate-y-2" data-testid={`dashboard-kit-card-${kit.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{kit.name}</h3>
                  <p className="text-gray-600 mb-3">{kit.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-saffron-600 font-bold text-xl">
                      ₹{kit.price.toLocaleString()}
                    </span>
                    <Badge variant={kit.inStock ? "default" : "secondary"}>
                      {kit.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(kit)}
                    disabled={!kit.inStock}
                    className="w-full bg-saffron-500 hover:bg-saffron-600 transition-colors transform hover:scale-105 font-medium disabled:opacity-50"
                    data-testid={`dashboard-add-to-cart-${kit.id}`}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
