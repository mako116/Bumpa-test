import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

jest.mock(
  "@expo/vector-icons/MaterialCommunityIcons",
  () => "MaterialCommunityIcons",
);
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: "success",
    Warning: "warning",
    Error: "error",
  },
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
}));
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

describe("CheckoutForm Component", () => {
  it("renders all form fields", () => {
    const { getByPlaceholderText } = render(
      <CheckoutForm onSubmit={jest.fn()} isLoading={false} />,
    );

    expect(getByPlaceholderText("John Doe")).toBeTruthy();
    expect(getByPlaceholderText("johndoe@example.com")).toBeTruthy();
    expect(getByPlaceholderText("123 Bookstore Lane")).toBeTruthy();
    expect(getByPlaceholderText("New York")).toBeTruthy();
    expect(getByPlaceholderText("10001")).toBeTruthy();
  });

  it("shows validation errors for empty fields when submitted", async () => {
    const onSubmitMock = jest.fn();
    const { getByText } = render(
      <CheckoutForm onSubmit={onSubmitMock} isLoading={false} />,
    );

    const submitButton = getByText("Place Order");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText("Full name is required")).toBeTruthy();
      expect(getByText("Email address is required")).toBeTruthy();
      expect(getByText("Shipping address is required")).toBeTruthy();
      expect(getByText("City is required")).toBeTruthy();
      expect(getByText("ZIP code is required")).toBeTruthy();
      expect(onSubmitMock).not.toHaveBeenCalled();
    });
  });

  it("shows error for invalid email", async () => {
    const { getByPlaceholderText, getByText } = render(
      <CheckoutForm onSubmit={jest.fn()} isLoading={false} />,
    );

    const emailInput = getByPlaceholderText("johndoe@example.com");
    fireEvent.changeText(emailInput, "invalidemail");

    const submitButton = getByText("Place Order");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(getByText("Invalid email address")).toBeTruthy();
    });
  });

  it("calls onSubmit with valid form data", async () => {
    const onSubmitMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <CheckoutForm onSubmit={onSubmitMock} isLoading={false} />,
    );

    fireEvent.changeText(getByPlaceholderText("John Doe"), "Alice Smith");
    fireEvent.changeText(
      getByPlaceholderText("johndoe@example.com"),
      "alice@example.com",
    );
    fireEvent.changeText(
      getByPlaceholderText("123 Bookstore Lane"),
      "456 Read Rd",
    );
    fireEvent.changeText(getByPlaceholderText("New York"), "Boston");
    fireEvent.changeText(getByPlaceholderText("10001"), "02115");

    const submitButton = getByText("Place Order");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        shipping: {
          fullName: "Alice Smith",
          email: "alice@example.com",
          address: "456 Read Rd",
          city: "Boston",
          zipCode: "02115",
          state: "",
          country: "United States",
        },
        payment: {
          method: "visa",
        },
      });
    });
  });
});
