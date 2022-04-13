/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/comma-dangle */
import type { SelectProps as ChakraSelectProps } from "@chakra-ui/react";
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select as ChakraSelect,
} from "@chakra-ui/react";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface OptionProps {
	value: string;
	optionName?: string;
}

interface SelectProps extends ChakraSelectProps {
	name: string;
	label?: string;
	error?: FieldError;
	options: Array<OptionProps>;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
	{ name, label, error = null, options, ...rest },
	ref
) => {
	return (
		<FormControl isInvalid={Boolean(error)}>
			{Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<ChakraSelect
				name={name}
				id={name}
				focusBorderColor="pink.500"
				size="lg"
				ref={ref}
				{...rest}
			>
				{options.map(({ value, optionName }) => {
					return (
						<option key={value} value={value}>
							{optionName ? optionName : value}
						</option>
					);
				})}
			</ChakraSelect>

			{Boolean(error) && <FormErrorMessage>{error?.message}</FormErrorMessage>}
		</FormControl>
	);
};

export const Select = forwardRef(SelectBase);
