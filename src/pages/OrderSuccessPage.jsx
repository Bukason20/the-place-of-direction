import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reference, name, email } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <Navbar />
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-40 pb-24 text-center">
        {/* Success icon */}
        <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={60} className="text-green-500" />
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Order Confirmed! 🎉
        </h1>
        <p className="text-gray-500 text-lg mb-2">
          Thank you{name ? `, ${name}` : ""}! Your order has been placed
          successfully.
        </p>
        {email && (
          <p className="text-gray-400 text-sm mb-2">
            A confirmation email has been sent to{" "}
            <span className="font-semibold text-gray-600">{email}</span>
          </p>
        )}
        {reference && (
          <p className="text-gray-400 text-sm mb-8">
            Reference:{" "}
            <span className="font-mono font-semibold text-gray-600">
              {reference}
            </span>
          </p>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-bold text-blue-900 mb-2">What happens next?</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>✅ You'll receive an email confirmation shortly</li>
            <li>✅ Our team has been notified and will process your order</li>
            <li>✅ We'll reach out via WhatsApp to arrange delivery</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            <Home size={18} />
            Go Home
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
