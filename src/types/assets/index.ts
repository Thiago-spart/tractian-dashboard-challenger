/* eslint-disable @typescript-eslint/naming-convention */
import { string } from "yup";

export interface MetricsProps {
	totalCollectsUptime: number;
	totalUptime: number;
	lastUptimeAt: Date;
}

export interface SpecificationsProps {
	maxTemp: number;
	power?: number;
	rpm?: number | null;
}

export interface BaseAssetsProps {
	sensors: [string];
	model: string;
	status: "inAlert" | "inDowntime" | "inOperation";
	healthscore: number;
	name: string;
	image: string;
	specifications: SpecificationsProps;
	metrics: MetricsProps;
	unitId: string;
	companyId: string;
	unit_id: string;
	company_id: string;
}

export type AssetsProps = Omit<BaseAssetsProps, "company_id" | "unit_id">;

export type AssetsServerProps = Omit<BaseAssetsProps, "companyId" | "unitId">;
