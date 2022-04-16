/* eslint-disable @typescript-eslint/no-magic-numbers */
import dynamic from "next/dynamic";

import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import { areaOptions } from "web/components/slide/options/areaOptions";
import { plotOption } from "web/components/slide/options/plotOption";

import { HeadTitle } from "../../components/HeadTitle";

import type { FCWithLayout } from "types/interfaces/layout";

const Chart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

export const DashBoard: FCWithLayout = () => {
	const usersSeries = [
		{
			name: "users per day",
			data: [31, 120, 10, 28, 61, 18, 109],
		},
	];

	return (
		<>
			<HeadTitle title="Dashboard" />

			<SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
				<Box p={["6", "8"]} bg="gray.800" borderRadius="8" pb="4">
					<Text fontSize="lg" mb="4">
						Week users
					</Text>
					<Chart
						type="area"
						height="160"
						series={usersSeries}
						options={areaOptions}
					/>
				</Box>

				<Box p={["6", "8"]} bg="gray.800" borderRadius="8" pb="4">
					<Text fontSize="lg" mb="4">
						Assets status
					</Text>
					<Chart
						type="radialBar"
						height="360"
						series={[50, 30, 20]}
						options={plotOption}
					/>
				</Box>
			</SimpleGrid>
		</>
	);
};
