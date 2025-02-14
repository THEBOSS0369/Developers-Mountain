"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

interface RadialChartProps {
  title?: string;
  description?: string;
  value: number;
  maxValue?: number;
  label?: string;
  trend?: number;
  trendPeriod?: string;
}

export function RadialChart({
  title = "Performance Score",
  description = "January - June 2024",
  value,
  maxValue = 100,
  label = "Score",
  trend = 0,
  trendPeriod = "this month",
}: RadialChartProps) {
  const chartData = [
    {
      score: value,
      fill: "#a3e635",
      maxValue: maxValue,
    },
  ];

  const chartConfig = {
    score: {
      label: label,
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="flex bg-stone-700/30 backdrop-blur-xl border-stone-700/70 shadow-[0_0_50px_theme(colors.neutral.700/30%)] flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-lime-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1  pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-stone-600  last:fill-stone-800"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="score"
              background
              cornerRadius={10}
              data={chartData}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
}
