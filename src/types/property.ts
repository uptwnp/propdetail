export interface Person {
  id: string;
  name: string;
  phone: string;
  about: string;
  role: string;
  contact_id: string;
  created_at: string;
  alternative_contact_details: string;
  updated_on: string;
}

export interface Connection {
  id: string;
  property_id: string;
  person_id: string;
  role: string;
  remark: string | null;
  created_on: string;
  updated_on: string;
}

export interface Property {
  id: string;
  title: string;
  price_min: string;
  price_max: string;
  size_min: string;
  size_max: string;
  type: string;
  area: string;
  zone: string;
  location: string;
  radius: string;
  description: string;
  highlights: string | null;
  status: string;
  rating: string;
  tags: string;
  note: string;
  city: string;
  created_at: string;
  updated_at: string;
  connections: Connection[];
  persons: Person[];
  links: any[];
}

export interface ApiResponse extends Property {}