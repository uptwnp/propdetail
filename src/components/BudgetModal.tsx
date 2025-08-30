import React, { useState } from "react";
import { X, IndianRupee, Home, TrendingUp } from "lucide-react";

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
}

export const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
}) => {
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [rentalIncome, setRentalIncome] = useState("");

  const handleSubmit = () => {
    const message = `Hi, I'm interested in ${
      propertyTitle === "Custom Property Search"
        ? "finding properties"
        : `exploring more properties like "${propertyTitle}"`
    }. Here are my requirements:

Budget Range: ${budget}
Purpose: ${purpose}

Please help me find suitable options.`;

    window.open(
      `https://wa.me/919518091945?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl w-full max-w-lg mx-4 mb-0 transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">
            Tell us your requirements
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Budget Range */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <IndianRupee className="w-4 h-4 mr-2" />
              What's your budget range?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Below 50 Lakh",
                "50-99 Lakh",
                "1-1.5 Cr",
                "1.5-2.5 Cr",
                "2.5-5 Cr",
                "5 Cr+",
              ].map((range) => (
                <button
                  key={range}
                  onClick={() => setBudget(range)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    budget === range
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Home className="w-4 h-4 mr-2" />
              Purpose and rental income?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Investment", "Self Use", "Rental", "Other"].map((option) => (
                <button
                  key={option}
                  onClick={() => setPurpose(option)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    purpose === option
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 pb-4">
          <button
            onClick={handleSubmit}
            disabled={!budget || !purpose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Send Requirements
          </button>
        </div>
      </div>
    </div>
  );
};
