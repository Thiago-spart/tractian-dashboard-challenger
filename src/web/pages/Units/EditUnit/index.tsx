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
import * as yup from "yup";

import { Input } from "web/components/Form/Input";
import { HeadTitle } from "web/components/HeadTitle";

import type { FCWithLayout } from "types/interfaces/layout";

import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";

interface EditUnitDataFormProps {
	name: string;
}

const EditUnitFormSchema = yup.object().shape({
	name: yup.string().required(),
});

export const EditUnit: FCWithLayout = () => {
	const [selectedUnit, setSelectedUnit] = useState<EditUnitDataFormProps>();

	const router = useRouter();
	const unitId = router.query.slug;

	const { register, handleSubmit, formState, setValue } =
		useForm<EditUnitDataFormProps>({
			resolver: yupResolver(EditUnitFormSchema),
		});

	const { errors } = formState;

	const updateUnit = useMutation(
		async (unit: EditUnitDataFormProps) => {
			const res = await api.patch(`units/${unitId}`, {
				unit: {
					name: `Unit ${unit.name}`,
					updateAt: new Date(),
				},
			});

			return res.data.unit;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("units");
			},
		}
	);

	const handleUpdateUnit: SubmitHandler<EditUnitDataFormProps> = async (
		values
	) => {
		await updateUnit.mutateAsync(values);

		router.push("/units");
	};

	useEffect(() => {
		const getUnitInfo = async () => {
			const res = await api.get(`units/${unitId}`);
			setSelectedUnit(res.data.unit);
		};

		getUnitInfo();
	}, [unitId]);

	useEffect(() => {
		if (!selectedUnit) return;

		setValue("name", selectedUnit.name.replace("Unit ", ""));
	}, [selectedUnit, setValue]);

	return (
		<>
			<HeadTitle title="Edit Unit" />

			<Box
				as="form"
				onSubmit={handleSubmit(handleUpdateUnit)}
				flex="1"
				borderRadius="8"
				bg="gray.800"
				p={["6", "8"]}
			>
				<Heading size="lg" fontWeight="normal">
					Edit Unit
				</Heading>

				<Divider my="6" borderColor="gray.700" />

				<VStack spacing="8">
					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<Input
							leftAddon="Unit"
							label="Complete Name"
							{...register("name", { disabled: !selectedUnit?.name })}
							error={errors.name}
						/>
					</SimpleGrid>
				</VStack>

				<Flex mt="8" justify="flex-end">
					<HStack spacing="4">
						<Link href="/units" passHref>
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
