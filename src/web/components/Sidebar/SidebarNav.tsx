import { Stack } from "@chakra-ui/react";
import {
	RiCommunityLine,
	RiContactsLine,
	RiDashboardLine,
	RiGitMergeLine,
	RiRemoteControlLine,
} from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export const SidebarNav: React.FC = () => {
	return (
		<Stack spacing="12" align="flex-start">
			<NavSection title="General">
				<NavLink icon={RiDashboardLine} title="Dashboard" href="/dashboard" />
				<NavLink icon={RiCommunityLine} title="Companies" href="/companies" />
			</NavSection>

			<NavSection title="Automation">
				<NavLink icon={RiContactsLine} title="Users" href="/users" />
				<NavLink icon={RiGitMergeLine} title="Units" href="/units" />
				<NavLink icon={RiRemoteControlLine} title="Assets" href="/assets" />
			</NavSection>
		</Stack>
	);
};
