/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/comma-dangle */
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import {
	FormControl,
	FormErrorMessage,
	InputLeftAddon,
	InputRightAddon,
	FormLabel,
	Input as ChakraInput,
	InputGroup,
} from "@chakra-ui/react";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
	name: string;
	label?: string;
	error?: FieldError;
	leftAddon?: string;
	rightAddon?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{ name, label, error = null, leftAddon, rightAddon, ...rest },
	ref
) => {
	return (
		<FormControl isInvalid={Boolean(error)}>
			{Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<InputGroup>
				{leftAddon && (
					<InputLeftAddon bg="gray.600" h="12" border="none">
						{leftAddon}
					</InputLeftAddon>
				)}
				<ChakraInput
					name={name}
					id={name}
					focusBorderColor="pink.500"
					bg="gray.900"
					variant="filled"
					_hover={{
						bg: "gray.900",
					}}
					size="lg"
					ref={ref}
					{...rest}
				/>
				{rightAddon && (
					<InputRightAddon bg="gray.600" h="12" border="none">
						{rightAddon}
					</InputRightAddon>
				)}
			</InputGroup>

			{Boolean(error) && <FormErrorMessage>{error?.message}</FormErrorMessage>}
		</FormControl>
	);
};

export const Input = forwardRef(InputBase);
