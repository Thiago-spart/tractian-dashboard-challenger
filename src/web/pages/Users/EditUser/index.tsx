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
	Icon,
	InputGroup,
	InputRightElement,
	SimpleGrid,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useMutation } from "react-query";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "web/components/Form/Input";
import { Select } from "web/components/Form/Select";
import { HeadTitle } from "web/components/HeadTitle";

import { useCompanies } from "services/hooks/useCompanies";
import { useUnits } from "services/hooks/useUnits";

import type { FCWithLayout } from "types/interfaces/layout";

import { api } from "../../../../services/api";
import { queryClient } from "../../../../services/queryClient";

interface UserServerProps {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	company_id: string;
	unit_id: string;
}

const EditUserFormSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().required().email(),
	password: yup.string().required().min(8),
	password_confirmation: yup
		.string()
		.oneOf([null, yup.ref("password")], "password must be the same"),
	company_id: yup.string().required(),
	unit_id: yup.string().required(),
});

export const EditUser: FCWithLayout = () => {
	const [selectedUser, setSelectedUser] = useState<UserServerProps>();
	const [showPassword, setShowPassword] = useState(false);

	const companyData = useCompanies().data?.companies.map((company) => {
		return { value: company.id, optionName: company.name };
	});

	const unitData = useUnits().data?.units.map((unit) => {
		return { value: unit.id, optionName: unit.name };
	});

	const handlePasswordVisibility = () => setShowPassword(!showPassword);

	const router = useRouter();
	const UserId = router.query.slug;

	const { register, handleSubmit, formState, setValue } =
		useForm<UserServerProps>({
			resolver: yupResolver(EditUserFormSchema),
		});

	const { errors } = formState;

	const updateUser = useMutation(
		async (user: UserServerProps) => {
			const res = await api.patch(`users/${UserId}`, {
				user: {
					name: user.name,
					password: user.password,
					email: user.email,
					company_id: user.company_id,
					unit_id: user.unit_id,
					updateAt: new Date(),
				},
			});

			return res.data.user;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("users");
			},
		}
	);

	const handleUpdateUser: SubmitHandler<UserServerProps> = async (values) => {
		await updateUser.mutateAsync(values);

		router.push("/users");
	};

	useEffect(() => {
		const getUserInfo = async () => {
			const res = await api.get(`users/${UserId}`);

			setSelectedUser(res.data.user);
		};

		getUserInfo();
	}, [UserId]);

	useEffect(() => {
		if (!selectedUser) return;

		setValue("email", selectedUser.email);
		setValue("name", selectedUser.name);
		setValue("password", selectedUser.password);
		setValue("password_confirmation", selectedUser.password);
		setValue("company_id", selectedUser.company_id);
		setValue("unit_id", selectedUser.unit_id);
	}, [selectedUser, setValue]);

	return (
		<>
			<HeadTitle title="Edit user" />

			<Box
				as="form"
				onSubmit={handleSubmit(handleUpdateUser)}
				flex="1"
				borderRadius="8"
				bg="gray.800"
				p={["6", "8"]}
			>
				<Heading size="lg" fontWeight="normal">
					Edit User
				</Heading>

				<Divider my="6" borderColor="gray.700" />

				<VStack spacing="8">
					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<Input
							label="Complete Name"
							{...register("name", { disabled: !selectedUser?.name })}
							error={errors.name}
						/>
						<Input
							type="email"
							label="E-mail"
							{...register("email", { disabled: !selectedUser?.email })}
							error={errors.email}
						/>
					</SimpleGrid>

					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<Select
							{...register("company_id", {
								disabled: !selectedUser?.company_id,
							})}
							error={errors.company_id}
							name="company_id"
							label="Company"
							options={companyData ? companyData : []}
						/>

						<Select
							{...register("unit_id", { disabled: !selectedUser?.unit_id })}
							error={errors.unit_id}
							name="unit_id"
							label="Unit"
							options={unitData ? unitData : []}
						/>
					</SimpleGrid>

					<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
						<InputGroup position="relative">
							<Input
								type={showPassword ? "text" : "password"}
								label="Password"
								error={errors.password}
								{...register("password", { disabled: !selectedUser?.password })}
							/>
							<InputRightElement position="absolute" top="9" right="2">
								<Button
									variant="unstyled"
									size="sm"
									onClick={handlePasswordVisibility}
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									{showPassword ? (
										<Icon as={RiEyeLine} fontSize="20" />
									) : (
										<Icon as={RiEyeCloseLine} fontSize="20" />
									)}
								</Button>
							</InputRightElement>
						</InputGroup>
						<InputGroup position="relative">
							<Input
								type={showPassword ? "text" : "password"}
								label="Confirming password"
								error={errors.password_confirmation}
								{...register("password_confirmation", {
									disabled: !selectedUser?.password,
								})}
							/>
							<InputRightElement position="absolute" top="9" right="2">
								<Button
									variant="unstyled"
									size="sm"
									onClick={handlePasswordVisibility}
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									{showPassword ? (
										<Icon as={RiEyeLine} fontSize="20" />
									) : (
										<Icon as={RiEyeCloseLine} fontSize="20" />
									)}
								</Button>
							</InputRightElement>
						</InputGroup>
					</SimpleGrid>
				</VStack>

				<Flex mt="8" justify="flex-end">
					<HStack spacing="4">
						<Link href="/users" passHref>
							<Button as="a" colorScheme="whiteAlpha">
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
