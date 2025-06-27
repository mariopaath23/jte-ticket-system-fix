"use client";

import { useEffect, useState } from "react";
import NavbarHome from "@/components/Navbar";
import RoomCard from "./components/roomCard";
import InfrastrukturCard from "./components/infrastrukturCard";
import { Separator } from "@/components/ui/separator";
import { ruanganDummy, type Ruangan } from "@/constants/ruanganDummy";
import FooterHome from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface Infrastruktur {
  id: number;
  itemName: string;
  category: string;
  location: string;
  isAvailable: boolean;
  timeFrame?: {
    start?: string;
    end?: string;
  };
  description?: string;
}

export default function statusPage(){
  const [infrastructures, setInfrastructures] = useState<Infrastruktur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfrastructures = async () => {
      try {
        const response = await fetch('/api/infrastructures');
        const data = await response.json();
        setInfrastructures(data);
      } catch (error) {
        console.error('Error fetching infrastructures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfrastructures();
  }, []);

  return(
    <div className="min-h-screen flex flex-col sm:bg-[#F9F6EE] dark:bg-[#1A1A1A]">
      <div className="relative">
        <NavbarHome />
        <div className="px-5 h-full mt-10">
          <div className="container mx-auto flex flex-col">
            <h1 className="text-3xl font-bold text-left mb-6">Status</h1>
            <p className="mb-4 text-left">Status Penggunaan Infrastruktur Jurusan Teknik Elektro</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 bg-[#F9F6EE] dark:bg-[#1A1A1A] px-15 mt-10">
        <div className="flex flex-col w-1/2 items-center gap-5">
          <h2 className="text text-xl font-bold">Ruangan</h2>
          <div className="overflow-y-auto w-full pb-4 pr-2 h-[calc(100vh-12rem)] sm:h-[calc(100vh-20rem)] mt-4 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {ruanganDummy.map((ruangan: Ruangan) => (
                <RoomCard
                  key={ruangan.roomName}
                  roomName={ruangan.roomName}
                  roomCapacity={ruangan.roomCapacity}
                  location={ruangan.location}
                  isAvailable={ruangan.isAvailable}
                  timeFrame={ruangan.timeFrame}
                />
              ))}
            </div>
          </div>
        </div>

        <Separator className="h-[calc(100vh - 4rem)]" orientation="vertical" decorative />

        <div className="flex flex-col w-1/2 items-center gap-5">
          <h2 className="text text-xl font-bold">Infrastruktur</h2>
          <div className="overflow-y-auto w-full pb-4 pr-2 h-[calc(100vh-12rem)] sm:h-[calc(100vh-20rem)] mt-4 mb-4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <p>Loading infrastruktur...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {infrastructures.map((infrastruktur: Infrastruktur) => (
                  <InfrastrukturCard
                    key={infrastruktur.id}
                    itemName={infrastruktur.itemName}
                    category={infrastruktur.category}
                    location={infrastruktur.location}
                    isAvailable={infrastruktur.isAvailable}
                    timeFrame={infrastruktur.timeFrame}
                    description={infrastruktur.description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterHome />
    </div>
  );
}