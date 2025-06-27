import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';

import NavbarHome from "@/components/Navbar";
import { CarouselHome } from "@/components/Carousel";
import { AccordionHome } from "@/components/Accordion";
import TeamBento from "@/components/TeamBento";
import TechStacks from "@/components/TechStacks";
import FooterHome from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Selamat Datang">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex flex-col sm:bg-[#F9F6EE] dark:bg-[#1A1A1A]">
            <div className="min-h-screen relative">
                <NavbarHome />
                <div className="px-5 h-full">
                <div className="container mx-auto h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-left mb-6 sm:text-center">Selamat datang di{" "}
                    <span className="sm:underline underline-offset-10">Sistem Manajemen Tiket JTE</span>
                    </h1>
                    <p className="mb-4 text-left sm:text-center">Sistem Informasi, Pengajuan, Persetujuan, Penerbitan - Di satu tempat.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={() => router.visit("/status")}
                        className="bg-[#F9F6EE] dark:bg-[#1A1A1A]   text-[#5C5346] hover:bg-[#5C5346]/80 hover:text-[#F9F6EE]"
                    >
                        Lihat Ketersediaan Infrastruktur
                    </Button>
                    </div>
                </div>
                </div>
            </div>

            <div className="bg-[#5C5346] dark:bg-[#1A1A1A] min-h-screen flex flex-col justify-center text-[#F9F6EE]">
                <div className="container mx-auto px-5 py-10 h-full flex flex-col sm:flex-row items-center justify-evenly gap-10">
                <div className="hidden sm:block sm:w-1/2">
                    <CarouselHome />
                </div>
                <div className="w-full sm:w-1/2">
                    <h2 className="text-4xl font-bold mb-4">Pertanyaan Umum</h2>
                    <AccordionHome />
                </div>
                </div>
            </div>

            <div className="bg-[#F9F6EE] dark:bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-left mb-6 sm:text-center">Kenali{" "}
                <span className="sm:underline underline-offset-10">Tim Kami</span>
                </h1>
                <p className="sm:text-center">Sapa tim di balik Sistem Manajemen Tiket JTE👋</p>
                <TeamBento />
            </div>

            <div className="bg-[#5C5346] dark:bg-[#1A1A1A] min-h-screen flex flex-col justify-center items-center text-[#F9F6EE]">
                <h1 className="text-3xl font-bold text-left mb-6 sm:text-center">Teknologi{" "}
                <span className="sm:underline underline-offset-10">Yang Digunakan</span>
                </h1>
                <p className="sm:text-center">Teknologi yang menjadi fondasi Sistem Manajemen Tiket JTE</p>
                <div className="max-w-[75vw]">
                <TechStacks />
                </div>
            </div>
            <FooterHome />
            </div>
        </>
    );
}
