/* eslint-disable @typescript-eslint/no-magic-numbers */
import faker from "faker";
import { Factory } from "miragejs";

export const userFactory = Factory.extend({
	name: () => {
		return faker.name.findName();
	},
	email: () => {
		return faker.internet.email().toLowerCase();
	},
	password: () => {
		return faker.internet.password();
	},
	createdAt: () => {
		return faker.date.recent(10);
	},
	unitId: () => {
		return String(faker.random.number({ min: 1, max: 2 }));
	},
	companyId: () => {
		return "1";
	},
});
