

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  method: 'visa' | 'mastercard' | 'paypal' | 'apple_pay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface CheckoutFormData {
  shipping: ShippingAddress;
  payment: PaymentInfo;
}

export interface OrderResult {
  orderId: string;
  status: 'success' | 'failed';
  message: string;
  estimatedDelivery: string;
}

export interface FormErrors {
  [key: string]: string;
}
