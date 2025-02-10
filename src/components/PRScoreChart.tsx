import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const PRScoreChart = ({ prsWithScores }) => {
  // Transform PR data for the chart
  const chartData = prsWithScores
    .filter(
      (item) => item && item.score !== null && item.pr && item.pr.created_at,
    )
    .map(({ pr, score }) => ({
      date: pr.created_at
        ? new Date(pr.created_at).toLocaleDateString()
        : "Unknown Date",
      quality: score?.metrics?.complexityScore ?? 0,
      impact: score?.metrics?.impactScore ?? 0,
    }))
    .reverse();

  if (chartData.length === 0) {
    return null;
  }

  // Calculate trend
  const lastTwoScores = chartData.slice(-2);
  const trend =
    lastTwoScores.length > 1
      ? (lastTwoScores[1].quality +
          lastTwoScores[1].impact -
          (lastTwoScores[0].quality + lastTwoScores[0].impact)) /
        2
      : 0;

  const chartConfig = {
    quality: {
      label: "Code Quality",
      color: "hsl(var(--chart-1))",
    },
    impact: {
      label: "Impact",
      color: "hsl(var(--chart-2))",
    },
  };

  const dateRange =
    chartData.length > 0
      ? `${chartData[0].date} - ${chartData[chartData.length - 1].date}`
      : "No data available";

  return (
    <Card>
      <CardHeader>
        <CardTitle>PR Score Trends</CardTitle>
        <CardDescription>
          Showing code quality and impact scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            height={350}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillQuality" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-quality)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-quality)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillImpact" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-impact)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-impact)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="impact"
              type="natural"
              fill="url(#fillImpact)"
              fillOpacity={0.4}
              stroke="var(--color-impact)"
              stackId="a"
            />
            <Area
              dataKey="quality"
              type="natural"
              fill="url(#fillQuality)"
              fillOpacity={0.4}
              stroke="var(--color-quality)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {trend !== 0 && (
                <>
                  Trending {trend > 0 ? "up" : "down"} by{" "}
                  {Math.abs(trend).toFixed(1)}%
                  {trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {dateRange}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PRScoreChart;
