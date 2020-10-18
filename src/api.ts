export type NewInsightsApiResponse = {
  groups: InsightApiGroup[];
};

export type InsightApiGroup = {
  id: string;
  header: string;
  items: InsightApiItem[];
};

export type InsightApiItem = {
  id: string;
  variant: InsightApiItemVariant;
  header: string;
  description: string;
};

export type InsightApiItemVariant = "add" | "remove" | "increase" | "people";

export type HistoricalInsightsApiResponse = {
  groups: HistoricalInsightApiGroup[];
};

export type HistoricalInsightApiGroup = {
  id: string;
  header: string;
  items: HistoricalInsightApiItem[];
};

export type HistoricalInsightApiItem = {
  id: string;
  variant: InsightApiItemVariant;
  header: string;
  description: string;
  state: HistoricalInsightApiItemState | null;
};

export type HistoricalInsightApiItemState = "accepted" | "dismissed";

export async function mockNewInsightsFetch(): Promise<NewInsightsApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    groups: [
      {
        header: "Catalog",
        id: "catalog",
        items: [
          {
            variant: "add",
            id: "add-strawberry-mocha-latte",
            header:
              "Add *Strawberry Mocha Latte* to your catalog for up to *34%* increased revenue",
            description:
              "Based on sales data in 210 other stores that stock this item in the past 2 months",
          },
          {
            variant: "remove",
            id: "remove-mocha-americano",
            header: "Remove *Mocha Americano* from your catalog",
            description:
              "Overall revenue contribution: *0.001%* (based on sales data in this store over the past year). Overall market revenue contribution: *0.00056%* (based on sales data in 21 other stores that stock this item in the past year.",
          },
        ],
      },
      {
        header: "Promotions",
        id: "promotions",
        items: [
          {
            variant: "increase",
            id: "hazelnut-espresso",
            header:
              "Promote *Hazelnut Espresso* for up to *70%* sales growth on that item and *12%* increased revenue",
            description:
              "Based on sales data in 12 other stores that promoted this item in the past 2 months",
          },
        ],
      },
      {
        header: "Staffing",
        id: "staffing",
        items: [
          {
            variant: "people",
            id: "increase-staffing-thursday-fridays",
            header:
              "Increase staffing on *Thursdays* and *Fridays* from *11:00 AM* to *3:00 PM* to see potential revenue increases of *28%*",
            description:
              "Labor cost increase (per month): *$ 1,201.31*\nPotential revenue increase (per month): *$ 4,901.77*\nOverall potential increase in profit: *$ 3,700,46*",
          },
        ],
      },
    ],
  };
}

export async function mockHistoricalInsightsFetch(): Promise<
  HistoricalInsightsApiResponse
> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    groups: [
      {
        id: "march-2020",
        header: "March 2020",
        items: [
          {
            id: "add-strawberry-mocha-latte",
            variant: "add",
            state: "accepted",
            header:
              "Add *Strawberry Mocha Latte* to your catalog for up to *34%* increased revenue",
            description:
              "Based on sales data in 210 other stores that stock this item in the past 2 months",
          },
          {
            id: "remove-mocha-americano",
            variant: "remove",
            state: "dismissed",
            header: "Remove *Mocha Americano* from your catalog",
            description:
              "Overall revenue contribution: *0.001%* (based on sales data in this store over the past year). Overall market revenue contribution: *0.00056%* (based on sales data in 21 other stores that stock this item in the past year.",
          },
          {
            id: "hazelnut-espresso",
            variant: "increase",
            state: null,
            header:
              "Promote *Hazelnut Espresso* for up to *70%* sales growth on that item and *12%* increased revenue",
            description:
              "Based on sales data in 12 other stores that promoted this item in the past 2 months",
          },
        ],
      },
      {
        id: "december-2019",
        header: "December 2019",
        items: [
          {
            id: "increase-staffing-thursday-fridays",
            variant: "people",
            state: "accepted",
            header:
              "Accepted - increase staffing on *Thursdays* and *Fridays* from *11:00 AM* to *3:00 PM* to see potential revenue increases of *28%*",
            description:
              "Labor cost increase (per month): *$ 1,201.31*\nPotential revenue increase (per month): *$ 4,901.77*\nOverall potential increase in profit: *$ 3,700,46*",
          },
        ],
      },
    ],
  };
}
