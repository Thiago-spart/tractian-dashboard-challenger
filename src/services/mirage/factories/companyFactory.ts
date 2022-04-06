import faker from "faker";
import { Factory } from "miragejs";

export const companyFactory = Factory.extend({
	name: () => {
		return faker.company.companyName();
	},
});
