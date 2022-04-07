/* eslint-disable @typescript-eslint/no-magic-numbers */
import faker from "faker";
import { Factory } from "miragejs";

export const assetFactory = Factory.extend({
	name: () => {
		return faker.random.arrayElements([
			"Motor H13D-1",
			"Motor H12D-1",
			"Motor H12D-2",
			"Motor H12D-3",
			"Ventilador D21",
			"Ventilador D22",
			"Ventilador D23",
			"Ventilador D24",
			"Ventilador D25",
			"Ventilador D26",
		]);
	},
	sensors: [() => faker.name.firstName()],
	model: () => {
		return faker.name.firstName();
	},
	status: () => {
		return faker.random.arrayElements(["inAlert", "inDowntime", "inOperation"]);
	},
	healthscore: () => {
		return faker.datatype.number({ min: 50, max: 92, precision: 0.01 });
	},
	Image: () => {
		return faker.random.arrayElements([
			"https://tractian-img.s3.amazonaws.com/6d5028682016cb43d02b857d4f1384ae.jpeg",
			"https://tractian-img.s3.amazonaws.com/dc8a497655c688ce381d6a3ba4af684d.jpeg",
			"https://tractian-img.s3.amazonaws.com/646a1fe6494d3a7405908076a5ac1429.jpeg",
			"https://tractian-img.s3.amazonaws.com/73a0d014d00f704b73965a049695ad0d.jpeg",
			"https://tractian-img.s3.amazonaws.com/16fbd9f50d3c6cfca8c6c2bc834ac0f0.jpeg",
			"https://tractian-img.s3.amazonaws.com/2f7eb04cfa255ab00088534f7d51f6f4.jpeg",
			"https://tractian-img.s3.amazonaws.com/1c588f23dc92a7b97975a10757dd0435.jpeg",
			"https://tractian-img.s3.amazonaws.com/19f526bc0f39fcf451de4098f48cd7d1.jpeg",
			"https://tractian-img.s3.amazonaws.com/28a89d706a3ef5579da321896b9d0da6.jpeg",
			"https://tractian-img.s3.amazonaws.com/4be920ff78c4cf143494d0af4e56ca06.jpeg",
		]);
	},
	specifications: {
		maxTemp: () => {
			return faker.datatype.number({ min: 60, max: 82 });
		},
		power: () => {
			return faker.datatype.number({ min: 0, max: 1.5, precision: 0.1 });
		},
		rpm: () => {
			return faker.datatype.number({ min: 800, max: 1800 });
		},
	},
	metrics: {
		totalCollectsUptime: () => {
			return faker.datatype.number({ min: 850, max: 9000 });
		},
		totalUptime: () => {
			return faker.datatype.number({
				min: 1300,
				max: 1600,
				precision: 0.0000000000001,
			});
		},
		lastUptimeAt: () => {
			return faker.date.recent(3);
		},
	},
	unitId: () => {
		return String(faker.datatype.number({ min: 1, max: 2 }));
	},
	companyId: () => {
		return "1";
	},
});
