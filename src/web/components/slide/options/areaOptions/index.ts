/* eslint-disable @typescript-eslint/no-magic-numbers */
import { theme } from "@chakra-ui/react";

import type { ApexOptions } from "apexcharts";

export const areaOptions: ApexOptions = {
	chart: {
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false,
		},
		foreColor: theme.colors.gray[500],
	},
	grid: {
		show: false,
	},
	dataLabels: {
		enabled: false,
	},
	tooltip: {
		followCursor: true,
		fillSeriesColor: false,
		style: {
			fontSize: theme.fontSizes.xs,
			fontFamily: theme.fonts.mono,
		},
		theme: "dark",
	},
	xaxis: {
		type: "datetime",
		axisBorder: {
			color: theme.colors.gray[600],
		},
		axisTicks: {
			color: theme.colors.gray[600],
		},
		categories: [
			"2021-03-21T00:00:00.000Z",
			"2021-03-22T00:00:00.000Z",
			"2021-03-23T00:00:00.000Z",
			"2021-03-24T00:00:00.000Z",
			"2021-03-25T00:00:00.000Z",
			"2021-03-26T00:00:00.000Z",
			"2021-03-27T00:00:00.000Z",
		],
	},
	fill: {
		opacity: 0.3,
		type: "gradient",
		gradient: {
			shade: "dark",
			opacityFrom: 0.7,
			opacityTo: 0.3,
		},
	},
} as const;
