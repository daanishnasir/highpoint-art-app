export interface CarListing {
  id: string;
  title: string;
  year: number;
  make: string;
  model: string;
  price: number;
  location: {
    city: string;
    state: string;
  };
  mileage?: number;
  isAuction: boolean;
  isClassified: boolean;
  imageUrl: string;
  endDate?: Date;
  dateListed: Date;
}

export interface CarImage {
  id: string;
  alt_description: string;
  originalIndex: number;
  price: number;
  bidEndTime?: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  description: string;
  user: {
    id: string;
    updated_at: string;
    location: string;
  };
  width: number;
  likes: number;
  updated_at: string;
}
