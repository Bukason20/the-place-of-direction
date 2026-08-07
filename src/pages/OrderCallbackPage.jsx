import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import axiosInstance from "../services/api";

const OrderCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "failed"
  const [message, setMessage] = useState("");

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      setStatus("failed");
      setMessage("No payment reference found.");
      return;
    }

    const verify = async () => {
      try {
        const res = await axiosInstance.get(`/orders/verify/${reference}`);

        if (res.data.success) {
          clearCart();
          setStatus("success");
          setMessage("Your payment was successful.");
        } else {
          setStatus("failed");
          setMessage(res.data.message || "Payment could not be confirmed.");
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setStatus("failed");
        setMessage(
          err.response?.data?.error?.message ||
            "We could not confirm your payment. Please contact support with your reference.",
        );
      }
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <Navbar />
      </div>

      <div className="max-w-xl mx-auto px-4 pt-40 pb-24 text-center">
        {status === "verifying" && (
          <>
            <Loader2
              size={48}
              className="animate-spin text-blue-600 mx-auto mb-6"
            />
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Confirming your payment...
            </h2>
            <p className="text-gray-500">Please don't close this page.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle size={56} className="text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Payment Successful!
            </h2>
            <p className="text-gray-500 mb-8">{message}</p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition"
            >
              Continue Shopping
            </button>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle size={56} className="text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Payment Not Confirmed
            </h2>
            <p className="text-gray-500 mb-8">{message}</p>
            <button
              onClick={() => navigate("/cart")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition"
            >
              Back to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCallbackPage;
