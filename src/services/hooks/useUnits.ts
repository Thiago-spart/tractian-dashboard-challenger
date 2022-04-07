/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from "react-query";

import { api } from "../api";

interface unitsProps {
	id: string;
	name: string;
}

interface GetUnitResponseProps {
	units: Array<unitsProps>;
}

const TEN_MINUTES = 5000;

export const getUnits = async (): Promise<GetUnitResponseProps> => {
	const { data } = await api.get("units", {
		params: {},
	});

	const units = data.units.map((company: unitsProps) => {
		return {
			id: company.id,
			name: company.name,
		};
	});

	return {
		units,
	};
};

export const useUnits = () => {
	return useQuery(["units"], () => getUnits(), {
		staleTime: TEN_MINUTES,
	});
};
