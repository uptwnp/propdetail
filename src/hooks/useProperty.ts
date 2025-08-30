import { useState, useEffect } from 'react';
import { Property } from '../types/property';

export function useProperty(propertyId: string | null) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) {
        setLoading(false);
        setProperty(null);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = `https://prop.digiheadway.in/api/v3/listing/details.php?id=${propertyId}`;
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch property: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format');
        }
        
        setProperty(data);
      } catch (err) {
        console.error('Property fetch error:', err);
        setError('Unable to load property details. Please try again later.');
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return { property, loading, error };
}