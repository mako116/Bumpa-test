import React from "react";
import { render } from "@testing-library/react-native";
import { BookPrice } from "@/components/books/BookPrice";

jest.mock("@/utils/formatPrice", () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
}));

describe("BookPrice Component", () => {
  it("renders the current price correctly", () => {
    const { getByTestId, queryByTestId } = render(<BookPrice price={19.99} />);

    const priceText = getByTestId("book-current-price");
    expect(priceText.props.children).toBe("$19.99");

    expect(queryByTestId("book-original-price")).toBeNull();
  });

  it("renders the original price and current price when original price is provided", () => {
    const { getByTestId } = render(
      <BookPrice price={14.99} originalPrice={19.99} />,
    );

    const currentPriceText = getByTestId("book-current-price");
    const originalPriceText = getByTestId("book-original-price");

    expect(currentPriceText.props.children).toBe("$14.99");
    expect(originalPriceText.props.children).toBe("$19.99");
  });

  it("does not render original price if it is equal to current price", () => {
    const { queryByTestId } = render(
      <BookPrice price={19.99} originalPrice={19.99} />,
    );
    expect(queryByTestId("book-original-price")).toBeNull();
  });

  it("does not render original price if it is less than current price", () => {
    const { queryByTestId } = render(
      <BookPrice price={19.99} originalPrice={14.99} />,
    );
    expect(queryByTestId("book-original-price")).toBeNull();
  });
});
