import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import axiosInstance from "../services/api";

const LOCATIONS = [
  "Lagos (Island)",
  "Lagos (Festac)",
  "Abuja",
  "Owerri",
  "Port Harcourt",
  "Diaspora (Nigeria)",
  "Diaspora (Overseas)",
  "Other",
];

const emptyForm = {
  name: "",
  phoneNumber: "",
  email: "",
  countryOfResidence: "",
  preferredLocation: "",
  otherLocationDetail: "",
  numberOfTimes: "",
  howHeardAboutUs: "",
  wantsUpdates: null,
  whatsappNumber: "",
};

const OneOnOneRegistrationPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.phoneNumber.trim()) return "Please enter your phone number.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!form.countryOfResidence.trim())
      return "Please enter your country of residence.";
    if (!form.preferredLocation) return "Please select a preferred location.";
    if (form.preferredLocation === "Other" && !form.otherLocationDetail.trim())
      return "Please specify your preferred location.";
    if (!form.numberOfTimes.toString().trim())
      return "Please enter the number of times.";
    if (form.wantsUpdates === null)
      return "Please let us know if you'd like to receive updates.";
    if (!form.whatsappNumber.trim())
      return "Please enter your WhatsApp number.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        category: "personal",
        name: form.name,
        phoneNumber: form.phoneNumber,
        email: form.email,
        countryOfResidence: form.countryOfResidence,
        preferredLocation: form.preferredLocation,
        otherLocationDetail:
          form.preferredLocation === "Other" ? form.otherLocationDetail : "",
        numberOfTimes: Number(form.numberOfTimes),
        howHeardAboutUs: form.howHeardAboutUs,
        wantsUpdates: form.wantsUpdates,
        whatsappNumber: form.whatsappNumber,
      };

      await axiosInstance.post("/one-on-one-registrations", {
        data: payload,
      });

      setSuccess(true);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(
        err.response?.data?.error?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-gray-900";
  const labelClass = "text-gray-700 text-sm font-semibold mb-1 block";

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative">
          <Navbar />
        </div>
        <div className="max-w-xl mx-auto px-4 pt-40 pb-24 text-center">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Registration Received!
          </h2>
          <p className="text-gray-500 mb-8">
            Thank you for registering for a one-on-one session. Our team will
            reach out to you shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <Navbar />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-40 pb-24">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate("/one-on-one")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition font-medium"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">
          One-on-One Registration
        </h1>
        <p className="text-gray-500 mb-10">
          Fill in your details below to register for a session.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Full name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(e) => update("phoneNumber", e.target.value)}
                placeholder="08012345678"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Country of Residence *</label>
              <input
                type="text"
                value={form.countryOfResidence}
                onChange={(e) => update("countryOfResidence", e.target.value)}
                placeholder="Nigeria"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Preferred Location for One-on-One *
            </label>
            <select
              value={form.preferredLocation}
              onChange={(e) => update("preferredLocation", e.target.value)}
              className={inputClass}
            >
              <option value="">Select a location</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {form.preferredLocation === "Other" && (
            <div>
              <label className={labelClass}>Please specify *</label>
              <input
                type="text"
                value={form.otherLocationDetail}
                onChange={(e) => update("otherLocationDetail", e.target.value)}
                placeholder="Your preferred location"
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label className={labelClass}>
              Number of Times (attended/wanting to attend) *
            </label>
            <input
              type="number"
              min="0"
              value={form.numberOfTimes}
              onChange={(e) => update("numberOfTimes", e.target.value)}
              placeholder="e.g. 1"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Would you like to receive information from us? *
            </label>
            <div className="flex gap-4 mt-1">
              <button
                type="button"
                onClick={() => update("wantsUpdates", true)}
                className={`px-5 py-2 rounded-xl font-semibold border transition ${
                  form.wantsUpdates === true
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => update("wantsUpdates", false)}
                className={`px-5 py-2 rounded-xl font-semibold border transition ${
                  form.wantsUpdates === false
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>WhatsApp Number *</label>
            <input
              type="tel"
              value={form.whatsappNumber}
              onChange={(e) => update("whatsappNumber", e.target.value)}
              placeholder="08012345678"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>How did you hear about us?</label>
            <input
              type="text"
              value={form.howHeardAboutUs}
              onChange={(e) => update("howHeardAboutUs", e.target.value)}
              placeholder="e.g. Instagram, a friend, church"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.01] transition disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2 text-lg"
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Registration"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OneOnOneRegistrationPage;
