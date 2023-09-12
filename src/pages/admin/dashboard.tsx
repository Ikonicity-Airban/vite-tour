import { IUser } from "../../api/@types";
import Section from "../../components/Section";
import { TourPlanList } from "./PlanList";
import { UserTable } from "../../components/TableComponent";
import { useFetchCollection } from "../../api/fetchCollections";

export default function AdminDashboard() {
  const users = useFetchCollection<IUser[]>("users");

  return (
    <Section title="Tours Plans" subtitle="">
      <TourPlanList />
      <UserTable users={users} />
    </Section>
  );
}
