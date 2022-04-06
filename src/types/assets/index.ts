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

export interface AssetsProps {
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
}
