import Section from "../components/Section";
import SearchBar from "../components/SearchBar";
import LoadingSection from "../components/LoadingSection";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import { useFetchCollection } from "../api/fetchSites";
import { IService } from "../api/@types";
import { Accordion, Card } from "flowbite-react";

function ServicesPage() {
  const services = useFetchCollection<IService>("services");

  return (
    <div className="md:mt-20">
      <BreadcrumbComponents />
      <Section id="our-services" subtitle="All our services">
        <LoadingSection />
        {services?.length ? (
          <div className="grid grid-cols-1 text-center w-full justify-center">
            <Accordion collapseAll className="w-full">
              {services.map(({ icon, name, desc }: IService, i: number) => (
                <Accordion.Panel key={i}>
                  <Accordion.Title className="text-xs">
                    <p>{name}</p>
                  </Accordion.Title>
                  <Accordion.Content className="text-justify">
                    <h1 className="text-center my-4 text-zinc-400">{name}</h1>
                    <div className="h-52 w-52 animate-bounce animate-title mx-auto  ">
                      <img
                        src={icon}
                        alt={name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p className="leading-loose">{desc}</p>
                  </Accordion.Content>
                </Accordion.Panel>
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="flex items-center justify-center outline-dashed dark:outline-slate-400 outline-1 outline-[whitesmoke] shadow-none h-[30vh] mt-10 ">
            <h4 className="w-full text-center">No Services Available</h4>
          </div>
        )}
      </Section>
    </div>
  );
}
export default ServicesPage;
