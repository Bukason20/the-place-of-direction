import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Users,
  Briefcase,
  CheckCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import axiosInstance from "../services/api";

const LOCATIONS = [
  "Lagos (Ajah)",
  "Lagos (Festac)",
  "Abuja",
  "Owerri",
  "Port Harcourt",
  "Diaspora (Nigeria)",
  "Diaspora (Overseas)",
  "Other",
];

const CATEGORIES = [
  {
    key: "personal",
    label: "Personal",
    icon: User,
    desc: "One-on-one mentoring for yourself",
  },
  {
    key: "family",
    label: "Family",
    icon: Users,
    desc: "For you and your nuclear family",
  },
  {
    key: "business",
    label: "Business",
    icon: Briefcase,
    desc: "For SMEs and corporate organizations",
  },
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
  familyMembers: "",
  organizationName: "",
  businessType: "",
  numberOfStaff: "",
  staffNames: "",
  businessAddress: "",
};

const OneOnOneRegistrationPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleCategorySelect = (key) => {
    setCategory(key);
    setForm(emptyForm);
    setError("");
  };

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

    if (category === "personal" && form.wantsUpdates === null)
      return "Please let us know if you'd like to receive updates.";
    if (category === "personal" && !form.whatsappNumber.trim())
      return "Please enter your WhatsApp number.";

    if (category === "family" && !form.familyMembers.trim())
      return "Please list your family members.";

    if (category === "business") {
      if (!form.organizationName.trim())
        return "Please enter your organization name.";
      if (!form.businessType) return "Please select SME or Corporate.";
      if (!form.numberOfStaff.toString().trim())
        return "Please enter the number of staff.";
      if (!form.staffNames.trim()) return "Please list staff names.";
      if (!form.businessAddress.trim())
        return "Please enter your business address.";
    }

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
        category,
        name: form.name,
        phoneNumber: form.phoneNumber,
        email: form.email,
        countryOfResidence: form.countryOfResidence,
        preferredLocation: form.preferredLocation,
        otherLocationDetail:
          form.preferredLocation === "Other" ? form.otherLocationDetail : "",
        numberOfTimes: Number(form.numberOfTimes),
        howHeardAboutUs: form.howHeardAboutUs,
      };

      if (category === "personal") {
        payload.wantsUpdates = form.wantsUpdates;
        payload.whatsappNumber = form.whatsappNumber;
      }

      if (category === "family") {
        payload.familyMembers = form.familyMembers;
      }

      if (category === "business") {
        payload.organizationName = form.organizationName;
        payload.businessType = form.businessType;
        payload.numberOfStaff = Number(form.numberOfStaff);
        payload.staffNames = form.staffNames;
        payload.businessAddress = form.businessAddress;
      }

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
            onClick={() =>
              category ? handleCategorySelect(null) : navigate("/one-on-one")
            }
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition font-medium"
          >
            <ArrowLeft size={18} />
            {category ? "Change Category" : "Back"}
          </button>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">
          One-on-One Registration
        </h1>
        <p className="text-gray-500 mb-10">
          Choose the category that best fits you to get started.
        </p>

        {!category && (
          <div className="grid sm:grid-cols-3 gap-6">
            {CATEGORIES.map(({ key, label, icon: Icon, desc }) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:border-transparent transition text-left"
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {label}
                </h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </button>
            ))}
          </div>
        )}

        {category && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5"
          >
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {CATEGORIES.find((c) => c.key === category)?.label} Registration
            </h2>

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
                  onChange={(e) =>
                    update("otherLocationDetail", e.target.value)
                  }
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

            {category === "personal" && (
              <>
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
              </>
            )}

            {category === "family" && (
              <div>
                <label className={labelClass}>
                  Names of Family Members (nuclear family, plus husband's
                  parents only) *
                </label>
                <textarea
                  rows={3}
                  value={form.familyMembers}
                  onChange={(e) => update("familyMembers", e.target.value)}
                  placeholder="List names, one per line"
                  className={`${inputClass} resize-none`}
                />
              </div>
            )}

            {category === "business" && (
              <>
                <div>
                  <label className={labelClass}>Name of Organization *</label>
                  <input
                    type="text"
                    value={form.organizationName}
                    onChange={(e) => update("organizationName", e.target.value)}
                    placeholder="Organization name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Business Type *</label>
                  <div className="flex gap-4 mt-1">
                    <button
                      type="button"
                      onClick={() => update("businessType", "SME")}
                      className={`px-5 py-2 rounded-xl font-semibold border transition ${
                        form.businessType === "SME"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      SME (1–12 staff)
                    </button>
                    <button
                      type="button"
                      onClick={() => update("businessType", "Corporate")}
                      className={`px-5 py-2 rounded-xl font-semibold border transition ${
                        form.businessType === "Corporate"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200"
                      }`}
                    >
                      Corporate (12+ staff)
                    </button>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Number of Staff *</label>
                  <input
                    type="number"
                    min="0"
                    value={form.numberOfStaff}
                    onChange={(e) => update("numberOfStaff", e.target.value)}
                    placeholder="e.g. 5"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Name of Staff *</label>
                  <textarea
                    rows={3}
                    value={form.staffNames}
                    onChange={(e) => update("staffNames", e.target.value)}
                    placeholder="List staff names, one per line"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Address of Business *</label>
                  <textarea
                    rows={2}
                    value={form.businessAddress}
                    onChange={(e) => update("businessAddress", e.target.value)}
                    placeholder="Business address"
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </>
            )}

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
        )}
      </div>
    </div>
  );
};

export default OneOnOneRegistrationPage;
