/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ActiveModelSerializer, createServer, Model, Response } from "miragejs";

import type { AssetsProps } from "types/assets";

import type { CompanyProps } from "types/company";
import type { UnitProps } from "types/units";
import type { UserProps } from "types/users";

import { assetFactory } from "./factories/assetFactory";
import { companyFactory } from "./factories/companyFactory";
import { unitFactory } from "./factories/unitFactory";
import { userFactory } from "./factories/userFactory";

export const makeServer = () => {
	const server = createServer({
		serializers: {
			application: ActiveModelSerializer,
		},
		models: {
			user: Model.extend<Partial<UserProps>>({}),
			company: Model.extend<Partial<CompanyProps>>({}),
			unit: Model.extend<Partial<UnitProps>>({}),
			asset: Model.extend<Partial<AssetsProps>>({}),
		},
		factories: {
			user: userFactory,
			company: companyFactory,
			unit: unitFactory,
			asset: assetFactory,
		},
		seeds: serverSeeds => {
			serverSeeds.createList("user", 50);
			serverSeeds.createList("company", 1);
			serverSeeds.createList("unit", 2);
			serverSeeds.createList("asset", 20);
		},
		routes() {
			this.namespace = "api";
			this.timing = 750;

			this.get("/users", function (schema, request) {
				const { page = 1, per_page = 10 } = request.queryParams;

				const pageAsNumber = Number(page);
				const perPageAsNumber = Number(per_page);

				const total = schema.all("user").length;

				const pageStart = (pageAsNumber - 1) * perPageAsNumber;
				const pageEnd = pageStart + perPageAsNumber;

				const users = this.serialize(schema.all("user")).users.slice(
					pageStart,
					pageEnd,
				);

				return new Response(200, { "x-total-count": String(total) }, { users });
			});

			this.get("/users/:id");
			this.post("/users");
			this.del("/users/:id");
			this.patch("/users/:id");

			this.get("/companies");
			this.get("/companies/:id");
			this.post("/companies");
			this.del("/companies/:id");
			this.patch("/companies/:id");

			this.get("/units");
			this.get("/units/:id");
			this.post("/units");
			this.del("/units/:id");
			this.patch("/units/:id");

			this.namespace = "";
			this.passthrough();
		},
	});

	return server;
};
