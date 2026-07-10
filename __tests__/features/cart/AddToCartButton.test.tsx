import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

jest.mock("@expo/vector-icons/MaterialIcons", () => "MaterialIcons");
jest.mock("expo-haptics", () => ({
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
  NotificationFeedbackType: {
    Success: "success",
    Warning: "warning",
    Error: "error",
  },
}));

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

describe("AddToCartButton Component", () => {
  it('renders "Add to Cart" when item is not in cart', () => {
    const { getByText } = render(
      <AddToCartButton isInCart={false} onPress={jest.fn()} />,
    );

    expect(getByText("Add to Cart")).toBeTruthy();
  });

  it('renders "In Cart" when item is already in cart', () => {
    const { getByText } = render(
      <AddToCartButton isInCart={true} onPress={jest.fn()} />,
    );

    expect(getByText("In Cart")).toBeTruthy();
  });

  it("calls onPress when clicked", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AddToCartButton isInCart={false} onPress={onPressMock} />,
    );

    const button = getByText("Add to Cart");
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
