import AddReviewForm from "@/_components/product-reviews/AddReviewForm";
import { uploadProductReview } from "@/app/_lib/data-service-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";

vi.mock("@/app/_lib/data-service-client", () => ({
  uploadProductReview: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const renderWithQuery = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    // retry false aby neopakoval failed queries v teste -> fail immidiately
    defaultOptions: { queries: { retry: false } },
  });

  // wrapnuť providerom ako v appke
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

describe("AddReviewForm", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    // vyčistiť mock history pred každym testom
    mockOnClose.mockClear();
  });

  it("should disable button when form is empty", () => {
    renderWithQuery(<AddReviewForm productId={1} onClose={mockOnClose} />);
    expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
  });

  it("should show error when name is too short", async () => {
    const user = userEvent.setup();
    renderWithQuery(<AddReviewForm productId={1} onClose={mockOnClose} />);

    await user.type(screen.getByLabelText(/name/i), "A".repeat(31));

    expect(
      await screen.findByText(/maximum 30 characters/i),
    ).toBeInTheDocument();
  });

  it("should show error when review is too short", async () => {
    const user = userEvent.setup();
    renderWithQuery(<AddReviewForm productId={1} onClose={mockOnClose} />);

    await user.type(screen.getByLabelText(/name/i), "John");
    await user.type(screen.getByLabelText(/review/i), "A");

    expect(
      await screen.findByText(/at least 2 characters/i),
    ).toBeInTheDocument();
  });

  it("should show error when star is not selected", async () => {
    const user = userEvent.setup();
    renderWithQuery(<AddReviewForm productId={1} onClose={mockOnClose} />);

    await user.type(screen.getByLabelText(/name/i), "John");
    await user.type(screen.getByLabelText(/review/i), "Great shoes!");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(await screen.findByText(/please select a rating/i));
  });

  it("should submit successffully with valid data", async () => {
    const user = userEvent.setup();
    renderWithQuery(<AddReviewForm productId={1} onClose={mockOnClose} />);

    await user.type(screen.getByLabelText(/name/i), "John");
    await user.type(screen.getByLabelText(/review/i), "Great shoes!");
    await user.click(screen.getByRole("button", { name: /rate 4 stars/i }));
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should show error toast and not close when submission fails", async () => {
    vi.mocked(uploadProductReview).mockRejectedValueOnce(new Error("Failed"));

    const user = userEvent.setup();
    renderWithQuery(<AddReviewForm productId={1} onClose={mockOnClose} />);

    await user.type(screen.getByLabelText(/name/i), "John");
    await user.type(screen.getByLabelText(/review/i), "Great shoes!");
    await user.click(screen.getByRole("button", { name: /rate 4 stars/i }));
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(toast.error).toHaveBeenCalledWith("Your review could not be added!");
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
