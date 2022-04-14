/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable arrow-parens */
/* eslint-disable prettier/prettier */
import Link from "next/link";
import { useRouter } from "next/router";

import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { yupResolver } from "@hookform/resolvers/yup";
import faker from "faker";
import * as yup from "yup";

import { Input } from "web/components/Form/Input";
import { Select } from "web/components/Form/Select";
import { HeadTitle } from "web/components/HeadTitle";

import { useCompanies } from "services/hooks/useCompanies";
import { useUnits } from "services/hooks/useUnits";

import type { AssetsServerProps } from "../../../../types/assets";

import type { FCWithLayout } from "types/interfaces/layout";

import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";
import { imagesOptions, nameOptions, statusOptions } from "../InputOptions";

interface EditAssetDataFormProps {
	name: string;
	status: "inAlert" | "inDowntime" | "inOperation";
	model: string;
	sensor: string;
	companyId: string;
	unitID: string;
}

const EditAssetFormSchema = yup.object().shape({
	name: yup.string().required(),
	status: yup.string().required(),
	model: yup.string().required(),
	sensor: yup.string().required(),
	companyId: yup.string().required(),
	unitID: yup.string().required(),
});

export const EditAsset: FCWithLayout = () => {
	const [selectedAsset, setSelectedAsset] = useState<AssetsServerProps>();
	const router = useRouter();
	const AssetId = router.query.slug;

	const companyData = useCompanies().data?.companies.map((company) => {
		return { value: company.id, optionName: company.name };
	});

	const unitData = useUnits().data?.units.map((unit) => {
		return { value: unit.id, optionName: unit.name };
	});

	const editAsset = useMutation(
		async (asset: EditAssetDataFormProps) => {
			const res = await api.patch(`assets/${AssetId}`, {
				asset: {
					healthscore: faker.datatype.number({
						min: 50,
						max: 92,
						precision: 0.01,
					}),
					name: asset.name,
					updateAt: new Date(),
					company_id: asset.companyId,
					unit_id: asset.unitID,
					model: asset.model,
					status: asset.status,
					sensor: [asset.sensor],
					image: faker.random.arrayElement(imagesOptions),
					specifications: {
						maxTemp: faker.datatype.number({ min: 60, max: 82 }),
						power: faker.datatype.number({
							min: 0,
							max: 1.5,
							precision: 0.1,
						}),
						rpm: faker.datatype.number({ min: 800, max: 1800 }),
					},
					metrics: {
						totalCollectsUptime: faker.datatype.number({ min: 850, max: 9000 }),
						totalUptime: faker.datatype.number({
							min: 1300,
							max: 1600,
							precision: 0.0000000000001,
						}),
						lastUptimeAt: new Date(),
					},
				},
			});

			return res.data.asset;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("assets");
			},
		}
	);

	const { register, handleSubmit, formState, setValue } =
		useForm<EditAssetDataFormProps>({
			resolver: yupResolver(EditAssetFormSchema),
		});
	const { errors } = formState;

	const handleUpdateAsset: SubmitHandler<EditAssetDataFormProps> = async (
		values
	) => {
		await editAsset.mutateAsync(values);

		router.push("/assets");
	};

	useEffect(() => {
		const getAssetInfo = async () => {
			const res = await api.get(`assets/${AssetId}`);
			setSelectedAsset(res.data.asset);
		};

		getAssetInfo();
	}, [AssetId]);

	useEffect(() => {
		if (!selectedAsset) return;

		setValue("name", selectedAsset.name);
		setValue("companyId", selectedAsset.company_id);
		setValue("unitID", selectedAsset.unit_id);
		setValue("model", selectedAsset.model);
		setValue("status", selectedAsset.status);
		setValue("sensor", selectedAsset.sensors[0]);
	}, [selectedAsset, setValue]);

	return (
		<>
			<HeadTitle title="Add asset" />

			<Box
				as="form"
				onSubmit={handleSubmit(handleUpdateAsset)}
				flex="1"
				borderRadius="8"
				bg="gray.800"
				p={["6", "8"]}
			>
				<Heading size="lg" fontWeight="normal">
					Edit asset
				</Heading>

				<Divider my="6" borderColor="gray.700" />

				<VStack spacing="8">
					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<Select
							{...register("name", { disabled: !selectedAsset?.name })}
							error={errors.name}
							name="name"
							label="Name"
							options={nameOptions}
						/>

						<Select
							{...register("status", { disabled: !selectedAsset?.status })}
							error={errors.status}
							name="status"
							label="status"
							options={statusOptions}
						/>
					</SimpleGrid>
				</VStack>

				<VStack spacing="8" mt="8">
					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<Input
							{...register("model", { disabled: !selectedAsset?.model })}
							error={errors.model}
							placeholder="Smart Trac"
							label="Model"
						/>

						<Input
							{...register("sensor", { disabled: !selectedAsset?.sensors })}
							error={errors.sensor}
							placeholder="Sensor 2"
							label="Sensor"
						/>
					</SimpleGrid>
				</VStack>

				<VStack spacing="8" mt="8">
					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<Select
							{...register("companyId", {
								disabled: !selectedAsset?.company_id,
							})}
							error={errors.companyId}
							name="companyId"
							label="Company"
							options={companyData ? companyData : []}
						/>

						<Select
							{...register("unitID", { disabled: !selectedAsset?.unit_id })}
							error={errors.unitID}
							name="unitID"
							label="Unit"
							options={unitData ? unitData : []}
						/>
					</SimpleGrid>
				</VStack>

				<Flex mt="8" justify="flex-end">
					<HStack spacing="4">
						<Link href="/assets" passHref>
							<Button
								as="a"
								colorScheme="whiteAlpha"
								isDisabled={formState.isSubmitting}
							>
								Cancel
							</Button>
						</Link>
						<Button
							colorScheme="pink"
							type="submit"
							isLoading={formState.isSubmitting}
						>
							Save
						</Button>
					</HStack>
				</Flex>
			</Box>
		</>
	);
};
