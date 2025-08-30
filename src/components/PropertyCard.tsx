import React from "react";
import { Property } from "../types/property";
import {
  MapPin,
  Home,
  Ruler,
  IndianRupee,
  Phone,
  User,
  Calendar,
  Tag,
  Map,
} from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onBookSiteVisit?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onBookSiteVisit,
}) => {
  const formatPrice = (min: string, max: string) => {
    const minPrice = parseFloat(min) / 100; // Convert to crores
    const maxPrice = parseFloat(max) / 100; // Convert to crores

    if (minPrice === maxPrice) {
      return `₹${minPrice.toFixed(2)} Cr`;
    }
    return `₹${minPrice.toFixed(2)} - ₹${maxPrice.toFixed(2)} Cr`;
  };

  const formatSize = (min: string, max: string) => {
    const minSize = parseInt(min);
    const maxSize = parseInt(max);

    if (minSize === maxSize) {
      return `${minSize} sq ft`;
    }
    return `${minSize} - ${maxSize} sq yard`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 mb-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex items-center space-x-2 mb-3">
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">{property.type}</span>
        </div>

        <h1 className="text-lg font-bold mb-2 leading-tight">
          {property.title || `${property.type} in ${property.area}`}
        </h1>

        <div className="flex items-center text-blue-100 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{property.area}, Panipat</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Price and Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-100">
            <div className="flex items-center mb-1">
              <IndianRupee className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">
                Price Range
              </span>
            </div>
            <p className="text-base font-bold text-green-800">
              {formatPrice(property.price_min, property.price_max)}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-center mb-1">
              <Ruler className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Size</span>
            </div>
            <p className="text-base font-bold text-blue-800">
              {formatSize(property.size_min, property.size_max)}
            </p>
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
              {property.description}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {onBookSiteVisit && (
          <div className="space-y-3">
            <button
              onClick={() => {
                const searchQuery = `${property.area} Panipat`;
                const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
                  searchQuery
                )}`;
                window.open(googleMapsUrl, "_blank");
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200"
            >
              <Map className="w-4 h-4" />
              <span>View Area Location on Map</span>
            </button>

            <button
              onClick={onBookSiteVisit}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md"
            >
              Book Site Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
