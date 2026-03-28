import ProductPrice from "@/_components/_productDetails/ProductPrice";
import { render, screen } from "@testing-library/react";

describe("ProductPrice", () => {
  it("should show discounted price when discount exist", () => {
    render(<ProductPrice price={100} discount={50} />);

    expect(screen.getByText("€50.00")).toBeInTheDocument();
    expect(screen.getByText("€100.00")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("should show regular price when no discount", () => {
    render(<ProductPrice price={100} discount={50} />);

    expect(screen.getByText("€100.00")).toBeInTheDocument();
    expect(screen.queryByText("%")).not.toBeInTheDocument();
  });
});
