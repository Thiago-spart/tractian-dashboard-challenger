/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from "react-query";

import { api } from "../api";

interface CompaniesProps {
	id: string;
	name: string;
}

interface GetUserResponseProps {
	companies: Array<CompaniesProps>;
}

const TEN_MINUTES = 5000;

export const getCompanies = async (): Promise<GetUserResponseProps> => {
	const { data } = await api.get("companies", {
		params: {},
	});

	const companies = data.companies.map((company: CompaniesProps) => {
		return {
			id: company.id,
			name: company.name,
		};
	});

	return {
		companies,
	};
};

export const useCompanies = () => {
	return useQuery(["companies"], () => getCompanies(), {
		staleTime: TEN_MINUTES,
	});
};
