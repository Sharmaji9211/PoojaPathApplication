import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [name, setName] = useState("");
  const [, setLocation] = useLocation();
  const { dispatch } = useApp();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    const user = { id: Date.now().toString(), name: name.trim() };
    dispatch({ type: "SET_USER", payload: user });
    
    toast({
      title: "Welcome!",
      description: `Hello ${name}, you've been logged in successfully.`,
    });
    
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.739 8.89 10L12 27l1.11-.259C18.16 26.73 22 22.55 22 17V7L12 2zm0 2.236L20 7.618v9.382c0 4.152-2.88 7.531-7 8.236V4.236z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to PoojaPath</h2>
          <p className="mt-2 text-gray-600">Enter your name to access your dashboard</p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  required
                  data-testid="login-name-input"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700 transition-all transform hover:scale-105 font-semibold shadow-saffron"
                data-testid="login-submit-button"
              >
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
