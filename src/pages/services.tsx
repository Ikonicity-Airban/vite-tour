import Section from "../components/Section";
import LoadingSection from "../components/LoadingSection";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import { useFetchCollection } from "../api/fetchCollections";
import { IService } from "../api/@types";
import { Accordion } from "flowbite-react";
import PremiumCardList from "../components/PremiumCard";

function ServicesPage() {
  const services = useFetchCollection<IService>("services");

  return (
    <div className="md:mt-20 p-1">
      <BreadcrumbComponents />
      <LoadingSection />
      <PremiumCardList />
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
                  <Accordion.Content className="text-justify p-6">
                    <div className="p-6">
                      <h1 className="text-center my-4 text-zinc-400">{name}</h1>
                      <div className="h-52 w-52 animate-bounce animate-title mx-auto  ">
                        <img
                          src={icon}
                          alt={name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <p className="leading-loose">{desc}</p>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              ))}
            </Accordion>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded outline-dashed dark:outline-slate-400 outline-1 outline-[#c5c5c5] shadow-none h-[10rem] mt-10 ">
            <h4 className="w-full text-center">No Services Available</h4>
          </div>
        )}
      </Section>
    </div>
  );
}
export default ServicesPage;
