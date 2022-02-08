export interface Person {
  id: number;
  name: string;
  birthday: string;
  gender: 'male' | 'female';
}

export interface Pagination {
  count?: number;
  current_page: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface Address {
  id: number;
  address: string;
  post_code: string;
  city_name: string;
  country_name: string;
  person_id: number;
}

export interface PersonsResponse {
  status: boolean;
  message: string;
  data: {
    list: Person[];
    pagination: Pagination;
  }
}

export interface PersonResponse {
  status: boolean;
  message: string;
  data: Person;
}

export interface AddressesResponse {
  status: boolean;
  message: string;
  data: {
    list: Address[];
    pagination: Pagination;
  }
}

export interface AddressResponse {
  status: boolean;
  message: string;
  data: Address;
}

export interface PersonRequest {
  name: string;
  birthday: string;
}

export interface AddressRequest {
  address: string;
  post_code: string;
  city_name: string;
  country_name: string;
  person_id: number;
}
