import {
  getProductReviewsClient,
  getProductReviewStatsClient,
} from "@/app/_lib/data-service-client";
import { createClientInstance } from "@/utils/supabase/client";
import { render, screen } from "@testing-library/react";

const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockRange = vi.fn();
const mockOrder = vi.fn();
const mockSingle = vi.fn();

// vi.mock("@/utils/supabase/client", () => ({
//   createClientInstance: () => ({
//     from: () => ({
//       select: () => ({
//         eq: vi.fn().mockResolvedValue({
//           data: [{ stars: 5 }, { stars: 3 }, { stars: 1 }],
//           error: null,
//         }),
//       }),
//     }),
//   }),
// }));

vi.mock("@/utils/supabase/client", () => ({
  createClientInstance: () => ({
    from: () => ({
      select: mockSelect,
    }),
  }),
}));

describe("getProductReviewsClient", () => {
  beforeEach(() => {
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ order: mockOrder });
    mockOrder.mockReturnValue({ range: mockRange });
    mockRange.mockResolvedValue({
      data: [{ id: 1 }, { id: 2 }],
      error: null,
    });
  });

  it("should return reviews and no next page when less than pageSize", async () => {
    const result = await getProductReviewsClient(1, 1);

    expect(result.reviews).toHaveLength(2);
    expect(result.nextPage).toBeUndefined();
  });

  it("should return nextPage when results equal pageSize", async () => {
    mockRange.mockResolvedValue({
      data: [{ id: 1 }, { id: 2 }, { id: 3 }],
      error: null,
    });

    const result = await getProductReviewsClient(1, 1);

    expect(result.reviews).toHaveLength(3);
    expect(result.nextPage).toBe(2);
  });
});

////////////////////////////////////////////////////////////////

describe("getProductReviewStatsClient", () => {
  beforeEach(() => {
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockResolvedValue({
      data: [{ stars: 5 }, { stars: 3 }, { stars: 1 }],
      error: null,
    });
  });

  it("should calculate averages and star distribution correctly", async () => {
    const result = await getProductReviewStatsClient(1);

    expect(result.average).toBe(3);
    expect(result.total).toBe(3);
    expect(result.starDistribution).toEqual([
      { star: 5, count: 1, percentage: 33 },
      { star: 4, count: 0, percentage: 0 },
      { star: 3, count: 1, percentage: 33 },
      { star: 2, count: 0, percentage: 0 },
      { star: 1, count: 1, percentage: 33 },
    ]);
  });
});
