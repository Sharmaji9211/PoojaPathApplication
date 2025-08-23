import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import type { InsertPandit } from "@shared/schema";

export default function PanditRegister() {
  const { dispatch } = useApp();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    availability: "",
    image: "",
    specialties: [] as string[],
  });

  const specialtyOptions = [
    "Vedic Rituals",
    "Home Ceremonies", 
    "Wedding Ceremonies",
    "Katha",
    "Festival Pujas",
    "Grih Pravesh",
    "Satyanarayan Puja",
    "Durga Puja",
    "Ganesh Chaturthi",
    "Navratri Ceremonies"
  ];

  const availabilityOptions = [
    { value: "Mon-Fri 9AM-5PM", label: "Monday to Friday (9AM - 5PM)" },
    { value: "All days 8AM-6PM", label: "All Days (8AM - 6PM)" },
    { value: "Weekends 10AM-4PM", label: "Weekends Only (10AM - 4PM)" },
    { value: "Flexible timings", label: "Flexible Timings" },
    { value: "Morning slots only", label: "Morning Slots Only" },
    { value: "Evening slots only", label: "Evening Slots Only" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specialties: checked 
        ? [...prev.specialties, specialty]
        : prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.experience || !formData.availability || formData.specialties.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select at least one specialty.",
        variant: "destructive",
      });
      return;
    }

    const panditData: InsertPandit = {
      name: formData.name,
      experience: formData.experience,
      specialties: formData.specialties,
      availability: formData.availability,
      image: formData.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
    };

    const newPandit = {
      ...panditData,
      id: Date.now().toString(),
      rating: 0,
      reviews: 0,
    };

    dispatch({ type: "ADD_PANDIT_REGISTRATION", payload: newPandit });

    toast({
      title: "Registration Successful!",
      description: `Welcome ${formData.name}! Your pandit profile has been created. You will be contacted soon for verification.`,
    });

    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join as Pandit</h2>
              <p className="text-gray-600">Register to offer your spiritual services through PoojaPath</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="panditName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </Label>
                <Input
                  id="panditName"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name (e.g., Pandit Raj Kumar)"
                  className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  required
                  data-testid="pandit-name-input"
                />
              </div>

              <div>
                <Label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </Label>
                <Input
                  id="experience"
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="e.g., 15 years"
                  className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  required
                  data-testid="pandit-experience-input"
                />
              </div>

              <div>
                <Label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Availability *
                </Label>
                <Select onValueChange={(value) => handleInputChange("availability", value)} required>
                  <SelectTrigger className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent" data-testid="pandit-availability">
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-4">
                  Specialties * (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {specialtyOptions.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty}
                        checked={formData.specialties.includes(specialty)}
                        onCheckedChange={(checked) => handleSpecialtyChange(specialty, !!checked)}
                        data-testid={`specialty-${specialty.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                      <Label htmlFor={specialty} className="text-sm cursor-pointer">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL (Optional)
                </Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                  className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  data-testid="pandit-image-input"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use a default profile image
                </p>
              </div>

              <div className="border-t pt-6">
                <div className="bg-saffron-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Your profile will be reviewed by our team</li>
                    <li>• We'll contact you for verification within 24-48 hours</li>
                    <li>• Once approved, you'll appear in customer searches</li>
                    <li>• Start receiving booking requests from devotees</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setLocation("/")}
                  data-testid="pandit-back-button"
                >
                  Back to Home
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700 transition-all transform hover:scale-105 font-semibold"
                  data-testid="pandit-register-button"
                >
                  Register as Pandit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}