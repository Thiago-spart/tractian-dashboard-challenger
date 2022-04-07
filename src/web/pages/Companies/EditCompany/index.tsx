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

interface EditCompanyDataFormProps {
	name: string;
}

const EditCompanyFormSchema = yup.object().shape({
	name: yup.string().required(),
});

export const EditCompany: FCWithLayout = () => {
	const [selectedCompany, setSelectedCompany] =
		useState<EditCompanyDataFormProps>();

	const router = useRouter();
	const companyId = router.query.slug;

	const { register, handleSubmit, formState, setValue } =
		useForm<EditCompanyDataFormProps>({
			resolver: yupResolver(EditCompanyFormSchema),
		});

	const { errors } = formState;

	const updateCompany = useMutation(
		async (company) => {
			const res = await api.patch(`companies/${companyId}`, {
				company: {
					...company,
					updateAt: new Date(),
				},
			});

			return res.data.company;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("companies");
			},
		}
	);

	const handleUpdateCompany: SubmitHandler<EditCompanyDataFormProps> = async (
		values
	) => {
		await updateCompany.mutateAsync(values);

		router.push("/companies");
	};

	useEffect(() => {
		const getCompanyInfo = async () => {
			const res = await api.get(`companies/${companyId}`);
			console.log(res);
			setSelectedCompany(res.data.company);
		};

		getCompanyInfo();
	}, [companyId]);

	useEffect(() => {
		if (!selectedCompany) return;

		setValue("name", selectedCompany.name);
	}, [selectedCompany, setValue]);

	return (
		<>
			<HeadTitle title="Edit Company" />

			<Box
				as="form"
				onSubmit={handleSubmit(handleUpdateCompany)}
				flex="1"
				borderRadius="8"
				bg="gray.800"
				p={["6", "8"]}
			>
				<Heading size="lg" fontWeight="normal">
					Edit Company
				</Heading>

				<Divider my="6" borderColor="gray.700" />

				<VStack spacing="8">
					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<Input
							label="Complete Name"
							{...register("name", { disabled: !selectedCompany?.name })}
							error={errors.name}
						/>
					</SimpleGrid>
				</VStack>

				<Flex mt="8" justify="flex-end">
					<HStack spacing="4">
						<Link href="/companies" passHref>
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
