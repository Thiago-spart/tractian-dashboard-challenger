/* eslint-disable multiline-ternary */
/* eslint-disable no-nested-ternary */
import {
	Box,
	Button,
	Checkbox,
	Flex,
	Heading,
	Icon,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useBreakpointValue,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { HeadTitle } from "web/components/HeadTitle";
import { NextLink } from "web/components/NextLink";

import { ConfirmDeleteDialog } from "../Users/components/ConfirmDeleteDialog";

import { useCompanies } from "services/hooks/useCompanies";

import type { FCWithLayout } from "types/interfaces/layout";

export const CompaniesPage: FCWithLayout = () => {
	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true,
	});

	const { data, isLoading, error, refetch, isFetching } = useCompanies();

	return (
		<>
			<HeadTitle title="Companies" />
			<Box flex="1" borderRadius="8" bg="gray.800" p="8">
				<Flex mb="8" justify="space-between" align="center">
					<Heading size="lg" fontWeight="normal">
						Companies
						{!isLoading && isFetching && (
							<Spinner size="sm" color="gray.500" ml="4" />
						)}
					</Heading>

					<NextLink href="/companies/create">
						<Button
							as="button"
							size="sm"
							fontSize="sm"
							colorScheme="pink"
							leftIcon={<Icon as={RiAddLine} fontSize="20" />}
						>
							Add new
						</Button>
					</NextLink>
				</Flex>

				{isLoading ? (
					<Flex align="center" justify="center">
						<Spinner />
					</Flex>
				) : error ? (
					<Flex align="center" justify="center">
						Data error
					</Flex>
				) : (
					<>
						<Table colorScheme="whiteAlpha">
							<Thead>
								<Tr>
									<Th px={["4", "4", "6"]} color="gray.300" w="32">
										<Checkbox colorScheme="pink" />
									</Th>
									<Th>Companies</Th>
									{isWideVersion && <Th w="8"></Th>}
								</Tr>
							</Thead>
							<Tbody>
								{data?.companies.map(({ id, name }) => (
									<Tr key={id}>
										<Td px={["4", "4", "6"]}>
											<Checkbox colorScheme="pink" />
										</Td>
										<Td>
											<Box>
												<Text color="purple.400" fontWeight="bold">
													{name}
												</Text>
											</Box>
										</Td>
										{isWideVersion && (
											<Td>
												<Flex align="center" justify="center" gap="4">
													<NextLink href={`/users/edit/${id}`}>
														<Button
															as="button"
															size="sm"
															fontSize="sm"
															colorScheme="purple"
															cursor="pointer"
															aria-label="Edit user"
														>
															<Icon as={RiPencilLine} fontSize="16" />
														</Button>
													</NextLink>

													<ConfirmDeleteDialog userId={id} refetch={refetch} />
												</Flex>
											</Td>
										)}
									</Tr>
								))}
							</Tbody>
						</Table>
					</>
				)}
			</Box>
		</>
	);
};
