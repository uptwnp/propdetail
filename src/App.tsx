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
  
  // Get property ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('id');
  
  const { property, loading, error } = useProperty(propertyId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">Panipat Uptown Property</h1>
            <p className="text-base text-gray-700 mb-2 leading-relaxed">Unable to find what you are exactly looking for</p>
            <p className="text-sm text-gray-600 leading-relaxed">Please choose from the options below to help us assist you better</p>
          </div>
          
          {/* CTA Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <a
              href="https://wa.me/919518091945?text=Hi, I'm looking for residential properties. Can you help me find something suitable?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 leading-tight">Residential Properties</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Looking for homes, apartments, or plots</p>
            </a>
            
            <a
              href="https://wa.me/919518091945?text=Hi, I'm interested in commercial properties. Can you show me available options?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 leading-tight">Commercial Properties</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Shops, offices, or business spaces</p>
            </a>
            
            <a
              href="https://wa.me/919518091945?text=Hi, I need help with property investment. Can you guide me?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <Calculator className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2 leading-tight">Investment Guidance</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Expert advice on property investment</p>
            </a>
          </div>
        </main>
      </div>
    );
  }

  const handleBookSiteVisit = () => {
    setIsBudgetConfirmModalOpen(true);
  };

  const handleExploreMore = () => {
    setIsBudgetModalOpen(true);
  };

  const handleContactUs = () => {
    const propertyDetail = `${property.type} in ${property.area}`;
    window.open(`https://wa.me/919518091945?text=Hi, I'm interested in this property: ${propertyDetail}`, '_blank');
  };

  const handleBudgetConfirm = () => {
    const propertyDetail = `${property.type} in ${property.area}`;
    const message = `Hi, I'm interested in booking a site visit for this property: ${propertyDetail}. This property is within my budget range. Please let me know the available timings.`;
    window.open(`https://wa.me/919518091945?text=${encodeURIComponent(message)}`, '_blank');
    setIsBudgetConfirmModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
        
        {/* FAQ Section */}
        <div className="mt-5 bg-white rounded-xl shadow-md p-4">
          <h3 className="text-base font-bold text-gray-800 mb-4 text-left">FAQ</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Q1. How do you work?</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We understand your exact requirements and budget, then guide you with the best property options in Panipat. From consultation to site visits and closing the deal, we make the process simple, transparent, and hassle-free.
              </p>
            </div>
            
            <div className="border-b border-gray-100 pb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Q2. What areas do you specialize in?</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We deal in Huda Sectors, HRERA-approved projects, and almost all areas across Panipat.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Q3. Who are you?</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We are a team of experienced real estate consultants in Panipat. With years of local expertise and strong market knowledge, we help buyers and investors find the right property with trust and confidence.
              </p>
            </div>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="mt-5 bg-white rounded-xl shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-200"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-200"
            >
              <Youtube className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        
        {/* Modals */}
        <BudgetModal
          isOpen={isBudgetModalOpen}
          onClose={() => setIsBudgetModalOpen(false)}
          propertyTitle={property.title || `${property.type} in ${property.area}`}
        />
        
        <BudgetConfirmModal
          isOpen={isBudgetConfirmModalOpen}
          onClose={() => setIsBudgetConfirmModalOpen(false)}
          propertyTitle={property.title || `${property.type} in ${property.area}`}
          onConfirm={handleBudgetConfirm}
        />
        
        <BudgetModal
          isOpen={isRequirementModalOpen}
          onClose={() => setIsRequirementModalOpen(false)}
          propertyTitle="Custom Property Search"
        />
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
    </div>
  );
}

export default App;