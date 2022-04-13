/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/comma-dangle */
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import type {
	GroupBase,
	OptionsOrGroups,
	SelectComponent,
} from "chakra-react-select";
import { CreatableSelect } from "chakra-react-select";
import type { ForwardRefRenderFunction } from "react";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface MultipleSelectProps extends SelectComponent {
	name: string;
	label?: string;
	error?: FieldError;
	options: OptionsOrGroups<unknown, GroupBase<unknown>>;
}

const SelectMultipleChoices: ForwardRefRenderFunction<
	HTMLSelectElement,
	MultipleSelectProps
> = ({ name, label, error = null, options, ...rest }, ref) => {
	return (
		<FormControl isInvalid={Boolean(error)}>
			{Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<CreatableSelect
				size="lg"
				focusBorderColor="pink.500"
				chakraStyles={{
					control: (provided) => ({
						...provided,
						borderColor: "gray.900",
						bg: "gray.900",
						_hover: {
							bg: "gray.900",
						},
					}),
				}}
				isMulti
				options={options}
				placeholder="Select sensor..."
				closeMenuOnSelect={false}
				{...rest}
			/>

			{Boolean(error) && <FormErrorMessage>{error?.message}</FormErrorMessage>}
		</FormControl>
	);
};

export const MultipleSelect = forwardRef(SelectMultipleChoices);
