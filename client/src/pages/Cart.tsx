import { Link, useLocation } from "wouter";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { state, dispatch } = useApp();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryCharges = subtotal > 0 ? 100 : 0;
  const total = subtotal + deliveryCharges;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }
    dispatch({ type: "UPDATE_CART_QUANTITY", payload: { id, quantity: newQuantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const proceedToCheckout = () => {
    if (state.cart.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Add items to your cart before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }

    const order = {
      id: Date.now().toString(),
      items: state.cart.map(item => ({
        kitId: item.kitId,
        kitName: item.kitName,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_ORDER", payload: order });
    dispatch({ type: "CLEAR_CART" });

    toast({
      title: "Order Placed!",
      description: "Your order has been placed successfully. You can track it in your dashboard.",
    });

    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
              <span className="bg-saffron-100 text-saffron-800 px-3 py-1 rounded-full text-sm font-medium" data-testid="cart-item-count">
                {state.cart.reduce((total, item) => total + item.quantity, 0)} items
              </span>
            </div>

            {state.cart.length === 0 ? (
              <div className="text-center py-12" data-testid="empty-cart">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0H17M7 18h10"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Browse our puja kits and add items to your cart</p>
                <Link href="/kits">
                  <Button className="bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700">
                    Browse Kits
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {state.cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      data-testid={`cart-item-${item.id}`}
                    >
                      <img
                        src={item.image}
                        alt={item.kitName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.kitName}</h3>
                        <p className="text-saffron-600 font-semibold">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                          data-testid={`decrease-quantity-${item.id}`}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium" data-testid={`quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                          data-testid={`increase-quantity-${item.id}`}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        data-testid={`remove-item-${item.id}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t mt-8 pt-8">
                  <div className="bg-gradient-saffron-light rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold" data-testid="cart-subtotal">
                          ₹{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Delivery Charges</span>
                        <span className="font-semibold" data-testid="cart-delivery">
                          ₹{deliveryCharges.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
                        <span>Total</span>
                        <span className="text-saffron-600" data-testid="cart-total">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link href="/kits" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50"
                        data-testid="continue-shopping-button"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                    <Button
                      onClick={proceedToCheckout}
                      className="flex-1 bg-gradient-saffron hover:from-saffron-600 hover:to-saffron-700 transition-all transform hover:scale-105 font-semibold"
                      data-testid="checkout-button"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
