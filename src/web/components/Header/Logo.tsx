import Image from "next/image";

import { Text } from "@chakra-ui/react";

import { NextLink } from "../NextLink";

export const Logo = () => {
	return (
		<NextLink href="/dashboard">
			<Image src="/logo-tractian.svg" alt="tractian" width={100} height={20} />
		</NextLink>
	);
};
