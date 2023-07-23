import { DocumentData } from "firebase/firestore";
import { Table } from "flowbite-react";
import { Tour } from "../api/@types";

interface Props {
  data: Tour[] | DocumentData;
}

const TourPlanTable = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[50rem]">
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>duration</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data.length ? (
            data.map((tourPlan: Tour, i: number) => (
              <Table.Row key={i}>
                <Table.Cell>{tourPlan.title}</Table.Cell>
                <Table.Cell>{tourPlan.description}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={4} className="p-10 text-center">
                No Bookings recorded
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TourPlanTable;
