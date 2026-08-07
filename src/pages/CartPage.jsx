import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  BookOpen,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { MEDIA_BASE_URL } from "../services/api";
import axiosInstance from "../services/api";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, increment, decrement, totalAmount } = useCart();
  const [step, setStep] = useState("cart"); // "cart" | "checkout"
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = (e) => {
    e.preventDefault();
    setStep("checkout");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    try {
      const res = await axiosInstance.post("/orders/initialize", {
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        customerAddress: form.address,
        items: cart.map((item) => ({
          itemId: item.documentId,
          itemType: item.type,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount,
      });

      const { authorization_url } = res.data;

      if (!authorization_url) {
        setError("Could not start payment. Please try again.");
        setProcessing(false);
        return;
      }

      // NOTE: cart is intentionally NOT cleared here — it only gets
      // cleared once payment is confirmed on the callback page.
      // Redirect the whole browser to Paystack's checkout page.
      window.location.href = authorization_url;
    } catch (err) {
      console.error("Initialize request failed:", err);
      setError(
        err.response?.data?.error?.message ||
          "Could not start payment. Please try again.",
      );
      setProcessing(false);
    }
  };

  if (cart.length === 0 && step === "cart") {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          <div className="relative">
            <Navbar />
          </div>
          <div className="max-w-2xl mx-auto px-4 pt-40 pb-24 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={40} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Add some books to get started on your spiritual journey.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition"
            >
              Browse Books
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="relative">
          <Navbar />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() =>
                step === "checkout" ? setStep("cart") : navigate("/shop")
              }
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition font-medium"
            >
              <ArrowLeft size={18} />
              {step === "checkout" ? "Back to Cart" : "Continue Shopping"}
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left — Cart items or Checkout form */}
            <div className="lg:col-span-2">
              {step === "cart" ? (
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <ShoppingCart size={28} />
                    Your Cart
                  </h1>

                  <div className="space-y-4">
                    {cart.map((item) => {
                      const imageUrl =
                        item.image?.formats?.small?.url ||
                        item.image?.formats?.thumbnail?.url ||
                        item.image?.url;

                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4 items-center"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100">
                            {imageUrl ? (
                              <img
                                src={`${MEDIA_BASE_URL}${imageUrl}`}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen size={28} className="text-blue-400" />
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-gray-900 truncate">
                              {item.title}
                            </h3>
                            <p className="text-blue-600 font-bold">
                              ₦{item.price.toLocaleString()}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decrement(item.id)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increment(item.id)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right flex-shrink-0 min-w-[80px]">
                            <p className="font-black text-gray-900">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                    <CreditCard size={28} />
                    Your Details
                  </h1>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
                      {error}
                    </div>
                  )}

                  <form
                    onSubmit={handlePayment}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-gray-700 text-sm font-semibold mb-1 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="John Doe"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 text-sm font-semibold mb-1 block">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="john@example.com"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-700 text-sm font-semibold mb-1 block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="08012345678"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="text-gray-700 text-sm font-semibold mb-1 block">
                        Delivery Address *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        placeholder="Enter your full delivery address"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-gray-900 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.01] transition disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2 text-lg"
                    >
                      <CreditCard size={20} />
                      {processing
                        ? "Redirecting..."
                        : `Pay ₦${totalAmount.toLocaleString()}`}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Right — Order Summary */}
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-32">
                <h2 className="text-xl font-black text-gray-900 mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate max-w-[60%]">
                        {item.title}{" "}
                        <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span className="font-semibold text-gray-900">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-black text-gray-900 text-lg">
                      Total
                    </span>
                    <span className="font-black text-blue-600 text-xl">
                      ₦{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {step === "cart" && (
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.01] transition text-lg"
                  >
                    Proceed to Checkout
                  </button>
                )}

                <p className="text-xs text-gray-400 text-center mt-4">
                  🔒 Secured by Paystack
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
