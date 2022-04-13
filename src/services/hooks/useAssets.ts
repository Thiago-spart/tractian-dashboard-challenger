/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from "react-query";

import type { AssetsProps } from "types/assets";

import { api } from "../api";

interface AssetsWithId extends AssetsProps {
	id: string;
}

interface GetAssetsResponseProps {
	totalCount: number;
	assets: Array<AssetsWithId>;
}

const TEN_MINUTES = 5000;

export const getAssets = async (
	page: number,
): Promise<GetAssetsResponseProps> => {
	const { data, headers } = await api.get("assets", {
		params: {
			page,
		},
	});

	const totalCount = Number(headers["x-total-count"]);

	const assets = data.assets.map(
		({
			companyId,
			healthscore,
			id,
			image,
			metrics,
			model,
			name,
			sensors,
			specifications,
			status,
			unitId,
		}: AssetsWithId) => {
			return {
				companyId,
				healthscore,
				id,
				image,
				metrics: {
					totalCollectsUptime: metrics.totalCollectsUptime,
					totalUptime: metrics.totalUptime,
					lastUptimeAt: new Date(
						metrics.totalCollectsUptime,
					).toLocaleDateString("en", {
						day: "2-digit",
						month: "long",
						year: "numeric",
					}),
				},
				model,
				name,
				sensors,
				specifications,
				status,
				unitId,
			};
		},
	);

	return {
		assets,
		totalCount,
	};
};

export const useAssets = (page: number) => {
	return useQuery(["assets", page], () => getAssets(page), {
		staleTime: TEN_MINUTES,
	});
};
