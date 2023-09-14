import { FaHeart, FaHotel, FaReceipt } from "react-icons/fa6";

import AllBookingTable from "../../components/AllBookingTable";
import { FaUserCircle } from "react-icons/fa";
import { IUser } from "../../api/@types";
import Section from "../../components/Section";
import { Tabs } from "flowbite-react";
import TourPlanList from "./PlanList";
import TourSiteList from "./SitesList";
import { UserTable } from "../../components/TableComponent";
import { useFetchCollection } from "../../api/fetchCollections";

export default function AdminDashboard() {
  const users = useFetchCollection<IUser[]>("users");

  return (
    <div className="my-10 max-w-screen-desktop w-full mx-auto">
      <Tabs.Group aria-label="Full width tabs" style="underline">
        <Tabs.Item active icon={FaUserCircle} title="Users">
          <Section title="Users" subtitle="All Tour Users">
            <UserTable users={users.data} />
          </Section>
        </Tabs.Item>
        <Tabs.Item icon={FaHeart} title="Plans">
          <Section title="Plans" subtitle="All Tour Plans">
            <TourPlanList />
          </Section>
        </Tabs.Item>
        <Tabs.Item icon={FaHotel} title="Tour Sites">
          <Section title="Sites" subtitle="All Tour Sites">
            <TourSiteList />
          </Section>
        </Tabs.Item>
        <Tabs.Item icon={FaReceipt} title="Bookings">
          <Section title="bookings" subtitle="All Bookings">
            <AllBookingTable />
          </Section>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
