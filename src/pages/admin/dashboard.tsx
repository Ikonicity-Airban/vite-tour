import { IUser } from "../../api/@types";
import Section from "../../components/Section";
import TourPlanList from "./PlanList";
import { UserTable } from "../../components/TableComponent";
import { useFetchCollection } from "../../api/fetchCollections";
import TourSiteList from "./SitesList";

export default function AdminDashboard() {
  const users = useFetchCollection<IUser[]>("users");

  return (
    <>
      <Section title="Users" subtitle="All Tour Users">
        <UserTable users={users} />
      </Section>
      <Section title="Plans" subtitle="All Tour Plans">
        <TourPlanList />
      </Section>
      <Section title="Sites" subtitle="All Tour Sites">
        <TourSiteList />
      </Section>
    </>
  );
}
