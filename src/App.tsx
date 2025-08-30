import React from 'react';
import { Building2, Phone, MessageCircle, Search, Home, Calculator, Users, Instagram, Facebook, Youtube } from 'lucide-react';
import { PropertyCard } from './components/PropertyCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { BudgetModal } from './components/BudgetModal';
import { BudgetConfirmModal } from './components/BudgetConfirmModal';
import { useProperty } from './hooks/useProperty';

function App() {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = React.useState(false);
  const [isBudgetConfirmModalOpen, setIsBudgetConfirmModalOpen] = React.useState(false);
  const [isRequirementModalOpen, setIsRequirementModalOpen] = React.useState(false);
  
  // Get property ID from URL parameters safely
  const getPropertyId = () => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
      }
    } catch (error) {
      console.error('Error getting property ID:', error);
    }
    return null;
  };
  
  const propertyId = getPropertyId();
  const { property, loading, error } = useProperty(propertyId);

  // Show loading only for a brief moment
  if (loading && propertyId) {
    return <LoadingSpinner />;
  }

  // Show error only if there was an actual error and we were trying to load a property
  if (error && propertyId) {
    return <ErrorMessage message={error} onRetry={() => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }} />;
  }

  // Default landing page when no property ID or property not found
  const showLandingPage = !propertyId || !property;

  if (showLandingPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Panipat Uptown Property</h1>
                  <p className="text-xs text-gray-500">Real Estate Consultants</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Property</h1>
            <p className="text-lg text-gray-700 mb-2">Expert Real Estate Consultants in Panipat</p>
            <p className="text-sm text-gray-600">Choose from the options below to get started</p>
          </div>
          
          {/* CTA Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <a
              href="https://wa.me/919518091945?text=Hi, I'm looking for residential properties in Panipat. Can you help me find something suitable?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Residential Properties</h3>
              <p className="text-gray-600 text-sm">Homes, apartments, plots & villas</p>
            </a>
            
            <a
              href="https://wa.me/919518091945?text=Hi, I'm interested in commercial properties in Panipat. Can you show me available options?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Commercial Properties</h3>
              <p className="text-gray-600 text-sm">Shops, offices & business spaces</p>
            </a>
            
            <a
              href="https://wa.me/919518091945?text=Hi, I need expert guidance on property investment in Panipat. Can you help me?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Investment Guidance</h3>
              <p className="text-gray-600 text-sm">Expert advice & market insights</p>
            </a>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Get in Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="tel:+919518091945"
                className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Call Us</p>
                  <p className="text-blue-600 font-medium">+91 95180 91945</p>
                </div>
              </a>
              
              <a
                href="https://wa.me/919518091945"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-700 transition-colors">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">WhatsApp</p>
                  <p className="text-green-600 font-medium">Chat with us</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* WhatsApp Channel */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white mb-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-green-100 mb-4">
                Join our WhatsApp channel for instant notifications about new properties, price updates, and exclusive deals in Panipat.
              </p>
              <a
                href="https://whatsapp.com/channel/0029VaQOvGSLY6d4kuuuuX3i"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join WhatsApp Channel</span>
              </a>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">How do you work?</h4>
                <p className="text-gray-700 leading-relaxed">
                  We understand your exact requirements and budget, then guide you with the best property options in Panipat. From consultation to site visits and closing the deal, we make the process simple, transparent, and hassle-free.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">What areas do you specialize in?</h4>
                <p className="text-gray-700 leading-relaxed">
                  We deal in Huda Sectors, HRERA-approved projects, and almost all areas across Panipat including Model Town, GT Road, Assandh Road, and upcoming sectors.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Who are you?</h4>
                <p className="text-gray-700 leading-relaxed">
                  We are a team of experienced real estate consultants in Panipat with years of local expertise and strong market knowledge. We help buyers and investors find the right property with trust and confidence.
                </p>
              </div>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-110"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-200 transform hover:scale-110"
              >
                <Youtube className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Building2 className="w-6 h-6" />
              <span className="text-xl font-bold">Panipat Uptown Property</span>
            </div>
            <p className="text-gray-400 mb-2">
              Your trusted real estate partner in Panipat
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Panipat Uptown Property. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Property found - show property details
  const handleBookSiteVisit = () => {
    setIsBudgetConfirmModalOpen(true);
  };

  const handleExploreMore = () => {
    setIsBudgetModalOpen(true);
  };

  const handleBudgetConfirm = () => {
    const propertyDetail = `${property.type} in ${property.area}`;
    const message = `Hi, I'm interested in booking a site visit for this property: ${propertyDetail}. This property is within my budget range. Please let me know the available timings.`;
    window.open(`https://wa.me/919518091945?text=${encodeURIComponent(message)}`, '_blank');
    setIsBudgetConfirmModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panipat Uptown Property</h1>
                <p className="text-xs text-gray-500">Real Estate Consultants</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
        <PropertyCard property={property} onBookSiteVisit={handleBookSiteVisit} />
        
        {/* Action Buttons */}
        <div className="mt-5 space-y-3">
          <button
            onClick={handleExploreMore}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
          >
            Explore More Properties
          </button>
          
          <button
            onClick={handleExploreMore}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Find Property as per my requirement</span>
          </button>
        </div>
        
        {/* Contact Information */}
        <div className="mt-5 bg-white rounded-xl shadow-md p-4">
          <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="tel:+919518091945"
              className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">Call Us</p>
                <p className="text-blue-600 font-medium text-xs">+91 95180 91945</p>
              </div>
            </a>
            
            <a
              href="https://wa.me/919518091945"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-700 transition-colors">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm">WhatsApp</p>
                <p className="text-green-600 font-medium text-xs">Chat with us</p>
              </div>
            </a>
          </div>
        </div>
        
        {/* Keep Me Updated Section */}
        <div className="mt-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md p-4 text-white">
          <div className="text-center">
            <h3 className="text-base font-semibold mb-2">Stay Updated</h3>
            <p className="text-green-100 mb-4 text-xs sm:text-sm">
              Join our WhatsApp channel to get instant notifications about new properties, price updates, and exclusive deals in Panipat.
            </p>
            <a
              href="https://whatsapp.com/channel/0029VaQOvGSLY6d4kuuuuX3i"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-green-600 py-2 px-4 rounded-lg font-medium text-sm hover:bg-green-50 transition-all duration-200 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join WhatsApp Channel</span>
            </a>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Building2 className="w-5 h-5" />
            <span className="text-base font-bold">Panipat Uptown Property</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Panipat Uptown Property. Real Estate Consultants.
          </p>
        </div>
      </footer>
      
      {/* Modals */}
      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        propertyTitle={property?.title || `${property?.type} in ${property?.area}` || 'Custom Property Search'}
      />
      
      <BudgetConfirmModal
        isOpen={isBudgetConfirmModalOpen}
        onClose={() => setIsBudgetConfirmModalOpen(false)}
        propertyTitle={property?.title || `${property?.type} in ${property?.area}` || 'Property'}
        onConfirm={handleBudgetConfirm}
      />
    </div>
  );
}

export default App;