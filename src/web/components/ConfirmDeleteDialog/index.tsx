/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Icon,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import type {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from "react-query";

import { api } from "services/api";

interface ConfirmDeleteDialogProps {
	id: string;
	headerMessage: string;
	deletePath: string;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<any>>;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
	id,
	refetch,
	headerMessage,
	deletePath,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isDeleting, setIsDeleting] = useState(false);
	const cancelRef = useRef(null);
	const deleteUser = async (deletedId: string) => {
		try {
			setIsDeleting(true);
			const res = await api.delete(`${deletePath}/${deletedId}`);

			refetch();

			return res;
		} catch (err: unknown) {
			return err;
		} finally {
			setIsDeleting(false);
			onClose();
		}
	};

	return (
		<>
			<Button
				as="a"
				size="sm"
				fontSize="sm"
				cursor="pointer"
				colorScheme="red"
				aria-label="Delete user"
				onClick={onOpen}
			>
				<Icon as={RiCloseLine} fontSize="16" />
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent bgColor="gray.800">
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete {headerMessage}
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can&apos;t undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}
								colorScheme="whiteAlpha"
								isDisabled={isDeleting}
							>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={() => deleteUser(id)}
								ml={3}
								isLoading={isDeleting}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
