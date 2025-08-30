import { useState, useEffect } from 'react';
import { Property } from '../types/property';

export function useProperty(propertyId: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://prop.digiheadway.in/api/v3/listing/details.php?id=${propertyId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch property data');
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    } else {
      setLoading(false);
    }
  }, [propertyId]);

  return { property, loading, error };
}