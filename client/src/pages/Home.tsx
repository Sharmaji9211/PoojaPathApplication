import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { poojas } from "@/data/mockData";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { dispatch } = useApp();
  const { toast } = useToast();

  const handleBookPooja = (pooja: typeof poojas[0]) => {
    dispatch({ type: "SET_SELECTED_POOJA", payload: pooja });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We will get back to you soon!",
    });

    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gradient-saffron">Book Pandit Ji</span>
                  <br />
                  <span className="text-gray-800">& Puja Kits Online</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with verified pandits and get authentic puja kits delivered to your doorstep. 
                  Experience traditional spirituality with modern convenience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/poojas">
                  <Button
                    size="lg"
                    className="bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-saffron"
                    data-testid="explore-poojas-button"
                  >
                    Explore Poojas
                  </Button>
                </Link>
                <Link href="/kits">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 transition-all font-semibold text-lg"
                    data-testid="browse-kits-button"
                  >
                    Browse Kits
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Beautiful Indian temple with golden lighting"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-saffron-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Poojas Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Poojas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our curated selection of traditional poojas performed by experienced pandits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {poojas.slice(0, 4).map((pooja) => (
              <Card
                key={pooja.id}
                className="hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden group"
                data-testid={`pooja-card-${pooja.id}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pooja.image}
                    alt={`${pooja.name} puja setup`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pooja.name}</h3>
                  <p className="text-gray-600 mb-4">{pooja.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-saffron-600 font-semibold text-lg">₹{pooja.price.toLocaleString()}</span>
                    <Link href="/booking">
                      <Button
                        onClick={() => handleBookPooja(pooja)}
                        className="bg-saffron-500 hover:bg-saffron-600 transition-colors"
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
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                alt="Hindu priest performing puja ritual"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">About PoojaPath</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                PoojaPath bridges the gap between traditional spirituality and modern convenience. 
                We connect you with verified, experienced pandits who bring authentic religious ceremonies to your home.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to make spiritual practices accessible to everyone, whether you're celebrating 
                life's milestones or seeking divine blessings for new beginnings.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-saffron-50 rounded-lg">
                  <div className="text-2xl font-bold text-saffron-600">500+</div>
                  <div className="text-gray-600">Verified Pandits</div>
                </div>
                <div className="text-center p-4 bg-saffron-50 rounded-lg">
                  <div className="text-2xl font-bold text-saffron-600">10,000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-saffron-light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help you plan your perfect puja ceremony
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleContactSubmit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    required
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    required
                    data-testid="contact-email-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="focus:ring-2 focus:ring-saffron-500 focus:border-transparent resize-none"
                    required
                    data-testid="contact-message-input"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700 transition-all transform hover:scale-105 font-semibold shadow-saffron"
                    data-testid="contact-submit-button"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
