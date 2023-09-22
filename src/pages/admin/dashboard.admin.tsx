import { AllBookingTable, Section, UserTable } from "../../components";
import { FaCrown, FaMapLocation, FaReceipt } from "react-icons/fa6";

import { FaUserCircle } from "react-icons/fa";
import { Tabs } from "flowbite-react";
import TourPlanList from "./plan.admin";
import TourSiteList from "./site.admin";

export default function AdminDashboard() {
  return (
    <div className="my-10 max-w-screen-desktop w-full mx-auto">
      <Tabs.Group
        aria-label="Full width tabs"
        style="underline"
        className="space-x-20 mx-auto -mb-10"
      >
        <Tabs.Item icon={FaReceipt} title="Bookings">
          <Section title="bookings" subtitle="All Bookings by Users">
            <AllBookingTable />
          </Section>
        </Tabs.Item>
        <Tabs.Item icon={FaCrown} title="Plans">
          <Section title="Plans" subtitle="All Tour Package Plans">
            <TourPlanList />
          </Section>
        </Tabs.Item>
        <Tabs.Item icon={FaMapLocation} title="Tour Sites">
          <Section title="Sites" subtitle="All Tour Sites and Centers">
            <TourSiteList />
          </Section>
        </Tabs.Item>

        <Tabs.Item icon={FaUserCircle} title="Users">
          <Section title="Users" subtitle="All Tour Users">
            <UserTable />
          </Section>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
