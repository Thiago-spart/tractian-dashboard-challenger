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

interface UnitDataFormProps {
	name: string;
}

const CreateUnitFormSchema = yup.object().shape({
	name: yup.string().required(),
});

export const CreateUnit: FCWithLayout = () => {
	const router = useRouter();

	const createUnit = useMutation(
		async (unit: UnitDataFormProps) => {
			const res = await api.post("units", {
				unit: {
					name: `Unit ${unit.name}`,
					createdAt: new Date(),
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

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(CreateUnitFormSchema),
	});
	const { errors } = formState;

	const handleCreateUnit: SubmitHandler<UnitDataFormProps> = async (values) => {
		await createUnit.mutateAsync(values);

		router.push("/units");
	};

	return (
		<>
			<HeadTitle title="Add unit" />

			<Box
				as="form"
				onSubmit={handleSubmit(handleCreateUnit)}
				flex="1"
				borderRadius="8"
				bg="gray.800"
				p={["6", "8"]}
			>
				<Heading size="lg" fontWeight="normal">
					Create unit
				</Heading>

				<Divider my="6" borderColor="gray.700" />

				<VStack spacing="8">
					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<Input
							leftAddon="Unit"
							label="Name"
							{...register("name")}
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
