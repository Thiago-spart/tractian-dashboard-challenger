/* eslint-disable @typescript-eslint/no-magic-numbers */
import { theme } from "@chakra-ui/react";

import type { ApexOptions } from "apexcharts";

export const plotOption: ApexOptions = {
	plotOptions: {
		radialBar: {
			track: {
				show: true,
				startAngle: undefined,
				endAngle: undefined,
				background: theme.colors.whiteAlpha[800],
				strokeWidth: "97%",
				opacity: 1,
				margin: 5,
				dropShadow: {
					enabled: false,
					top: 0,
					left: 0,
					blur: 3,
					opacity: 0.5,
				},
			},
			dataLabels: {
				name: {
					fontSize: theme.fontSizes.xl,
				},
				value: {
					fontSize: theme.fontSizes.md,
					color: theme.colors.whiteAlpha[800],
				},
				total: {
					show: true,
					label: "Total",
					formatter: () => {
						return "20";
					},
					color: theme.colors.green[500],
				},
			},
		},
	},
	labels: ["inOperation", "inDowntime", "inAlert"],
	colors: [
		theme.colors.green[500],
		theme.colors.blue[500],
		theme.colors.red[500],
	],
};
