import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PaymentMethod } from '@/components/checkout/PaymentMethod';
import { CheckoutFormData, FormErrors } from '@/types';
import { Spacing } from '@/constants/theme';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isLoading: boolean;
}

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'mastercard' | 'paypal' | 'apple_pay'>('visa');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const tempErrors: FormErrors = {};
    if (!fullName.trim()) tempErrors.fullName = 'Full name is required';
    
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Invalid email address';
    }
    
    if (!address.trim()) tempErrors.address = 'Shipping address is required';
    if (!city.trim()) tempErrors.city = 'City is required';
    if (!zipCode.trim()) tempErrors.zipCode = 'ZIP code is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        shipping: {
          fullName,
          email,
          address,
          city,
          zipCode,
          state: '',
          country: 'United States',
        },
        payment: {
          method: paymentMethod,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Full Name"
        placeholder="John Doe"
        value={fullName}
        onChangeText={setFullName}
        error={errors.fullName}
        autoCapitalize="words"
      />

      <Input
        label="Email Address"
        placeholder="johndoe@example.com"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        label="Shipping Address"
        placeholder="123 Bookstore Lane"
        value={address}
        onChangeText={setAddress}
        error={errors.address}
        autoCapitalize="words"
      />

      <View style={styles.row}>
        <Input
          containerStyle={styles.halfInput}
          label="City"
          placeholder="New York"
          value={city}
          onChangeText={setCity}
          error={errors.city}
          autoCapitalize="words"
        />

        <Input
          containerStyle={styles.halfInput}
          label="ZIP Code"
          placeholder="10001"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="numeric"
          error={errors.zipCode}
        />
      </View>

      <PaymentMethod selectedMethod={paymentMethod} onChangeMethod={setPaymentMethod} />

      <Button
        style={styles.submitBtn}
        title={isLoading ? 'Processing Order...' : 'Place Order'}
        onPress={handleSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing['3xl'],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  submitBtn: {
    marginTop: Spacing.md,
  },
});
