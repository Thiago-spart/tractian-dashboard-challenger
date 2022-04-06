import faker from "faker";
import { Factory } from "miragejs";

export const unitFactory = Factory.extend({
	name: () => {
		return `Unit ${faker.name.firstName()}`;
	},
});
