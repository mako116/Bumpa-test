import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CartItem } from "@/components/cart/CartItem";

jest.mock("@expo/vector-icons/MaterialIcons", () => "MaterialIcons");
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

jest.mock("expo-image", () => {
  const { View } = require("react-native");
  return {
    Image: (props: any) => <View {...props} testID="mock-image" />,
  };
});
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

const mockBook = {
  id: "1",
  title: "Atomic Habits",
  author: "James Clear",
  description: "A book about habits",
  price: 16.99,
  imageUrl: "https://example.com/cover.jpg",
  rating: 4.8,
  ratingCount: 1200,
  reviews: [],
  genre: "Self-Help",
  isbn: "1234567890",
  pages: 320,
  publishDate: "2018-10-16",
  publisher: "Avery",
  inStock: true,
};

const mockItem = {
  book: mockBook,
  quantity: 2,
};

describe("CartItem Component", () => {
  it("renders item details correctly", () => {
    const { getByText } = render(
      <CartItem
        item={mockItem}
        onIncrease={jest.fn()}
        onDecrease={jest.fn()}
        onRemove={jest.fn()}
      />,
    );

    expect(getByText("Atomic Habits")).toBeTruthy();
    expect(getByText("by James Clear")).toBeTruthy();
  });

  it("calls onRemove when delete button is pressed", () => {
    const onRemoveMock = jest.fn();
    const { getByTestId } = render(
      <CartItem
        item={mockItem}
        onIncrease={jest.fn()}
        onDecrease={jest.fn()}
        onRemove={onRemoveMock}
      />,
    );

    const deleteBtn = getByTestId("remove-item-button");
    fireEvent.press(deleteBtn);
    expect(onRemoveMock).toHaveBeenCalled();
  });

  it("calls onIncrease and onDecrease when quantity buttons are pressed", () => {
    const onIncreaseMock = jest.fn();
    const onDecreaseMock = jest.fn();
    const { getByTestId } = render(
      <CartItem
        item={mockItem}
        onIncrease={onIncreaseMock}
        onDecrease={onDecreaseMock}
        onRemove={jest.fn()}
      />,
    );

    const increaseBtn = getByTestId("increase-button");
    fireEvent.press(increaseBtn);
    expect(onIncreaseMock).toHaveBeenCalled();

    const decreaseBtn = getByTestId("decrease-button");
    fireEvent.press(decreaseBtn);
    expect(onDecreaseMock).toHaveBeenCalled();
  });
});
