/* eslint-disable @typescript-eslint/naming-convention */
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	colors: {
		gray: {
			"900": "#181B23",
			"800": "#1F2029",
			"700": "#353646",
			"600": "#4B4D63",
			"500": "#616480",
			"400": "#797D9A",
			"300": "#9699B0",
			"200": "#B3B5C6",
			"100": "#D1D2DC",
			"50": "#EEEEF2",
		},
	},
	fonts: {
		heading: "Roboto",
		body: "Roboto",
	},
	styles: {
		global: {
			body: {
				bg: "gray.900",
				color: "gray.50",
			},
		},
	},
	components: {
		Select: {
			variants: {
				default: {
					field: {
						"bg": "gray.900",
						"border": "none",
						"borderColor": "inherit",
						"focusBorderColor": "pink.500",
						"> option, > optgroup": {
							bg: "gray.800",
						},
						"_readOnly": {
							boxShadow: "none !important",
							userSelect: "all",
						},
						"_disabled": {
							opacity: 0.4,
							// eslint-disable-next-line sonarjs/no-duplicate-string
							cursor: "not-allowed",
						},
						"_invalid": {
							borderColor: "red.500",
							boxShadow: "0 0 0 1px red.500",
						},

						"_focus": {
							border: "1px solid",
							borderColor: "pink.500",
							zIndex: 1,
						},
					},
				},
			},
			defaultProps: {
				variant: "default",
			},
		},
	},
});
