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

const newInsightsUrl =
  "https://gist.githubusercontent.com/jazevedo620/4389fa57afd403a4f56db6b92053154d/raw/f3e0e68711a3946d8f505355c380631fef5e571a/new-insights.json";
const historicalInsightsUrl =
  "https://gist.githubusercontent.com/jazevedo620/4389fa57afd403a4f56db6b92053154d/raw/f3e0e68711a3946d8f505355c380631fef5e571a/historical-insights.json";

export async function mockNewInsightsFetch(): Promise<NewInsightsApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const response = await fetch(newInsightsUrl);
  return (await response.json()) as NewInsightsApiResponse;
}

export async function mockHistoricalInsightsFetch(): Promise<
  HistoricalInsightsApiResponse
> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const response = await fetch(historicalInsightsUrl);
  return (await response.json()) as HistoricalInsightsApiResponse;
}
