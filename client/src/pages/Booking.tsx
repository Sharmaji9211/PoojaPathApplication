import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import type { InsertBooking } from "@shared/schema";

export default function Booking() {
  const { state, dispatch } = useApp();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customerName: state.user?.name || "",
    phoneNumber: "",
    date: "",
    time: "",
    address: "",
    specialRequirements: "",
  });

  const timeSlots = [
    { value: "06:00", label: "6:00 AM" },
    { value: "08:00", label: "8:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "18:00", label: "6:00 PM" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.selectedPooja) {
      toast({
        title: "Error",
        description: "No puja selected. Please go back and select a puja.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.customerName || !formData.phoneNumber || !formData.date || !formData.time || !formData.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const bookingData: InsertBooking = {
      poojaId: state.selectedPooja.id,
      poojaName: state.selectedPooja.name,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      specialRequirements: formData.specialRequirements,
      status: "pending",
      amount: state.selectedPooja.price,
    };

    const booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_BOOKING", payload: booking });

    toast({
      title: "Booking Confirmed!",
      description: `Your ${state.selectedPooja.name} booking has been confirmed. You will receive a confirmation call soon.`,
    });

    setLocation("/dashboard");
  };

  if (!state.selectedPooja) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Puja Selected</h2>
            <p className="text-gray-600 mb-6">Please select a puja from the home page or dashboard to continue with booking.</p>
            <Button onClick={() => setLocation("/")} className="bg-gradient-saffron">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Your Puja</h2>
              <p className="text-gray-600">Fill in the details to schedule your ceremony</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="poojaType" className="block text-sm font-medium text-gray-700 mb-2">
                  Puja Type
                </Label>
                <Input
                  id="poojaType"
                  type="text"
                  value={state.selectedPooja.name}
                  readOnly
                  className="bg-gray-50"
                  data-testid="booking-pooja-type"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Enter your full name"
                    className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    required
                    data-testid="booking-customer-name"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="Enter your phone number"
                    className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    required
                    data-testid="booking-phone-number"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    required
                    data-testid="booking-date"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("time", value)} required>
                    <SelectTrigger className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent" data-testid="booking-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Complete Address *
                </Label>
                <Textarea
                  id="address"
                  rows={4}
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your complete address where the puja will be performed"
                  className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent resize-none"
                  required
                  data-testid="booking-address"
                />
              </div>

              <div>
                <Label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements (Optional)
                </Label>
                <Textarea
                  id="specialRequirements"
                  rows={3}
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                  placeholder="Any special requirements or notes for the pandit"
                  className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent resize-none"
                  data-testid="booking-special-requirements"
                />
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-saffron-600" data-testid="booking-total-amount">
                    ₹{state.selectedPooja.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setLocation("/dashboard")}
                  data-testid="booking-back-button"
                >
                  Back to Dashboard
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700 transition-all transform hover:scale-105 font-semibold"
                  data-testid="booking-confirm-button"
                >
                  Confirm Booking
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
