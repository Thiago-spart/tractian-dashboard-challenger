/* eslint-disable @typescript-eslint/naming-convention */
export interface BaseUserProps {
	name: string;
	email: string;
	created_at: string;
	password: string;
	unitId: string;
	companyId: string;
	company_id: string;
	unit_id: string;
}

export type UserProps = Omit<BaseUserProps, "company_id" | "unit_id">;

export type UserServerProps = Omit<BaseUserProps, "companyId" | "unitId">;
