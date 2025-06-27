"use client";
import { useState } from "react";

type teamBentoProps = {
  id: number;
  name: string;
  nim: number;
  role: string;
  imageUrl: string;
  overlayColor: string;
}

export default function TeamBento() {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const teamBentoProps: teamBentoProps[] = [
    {
      id: 1,
      name: "Mario Fernando Bernardino Paath",
      nim: 220211060017,
      role: "Project Manager, Frontend, Backend, & DevOps Engineer",
      imageUrl: "/assets/IMG_2670.jpg",
      overlayColor: "bg-yellow-500/80",
    },
    {
      id: 2,
      name: "Arnold Binsar Simanjuntak",
      nim: 220211060060,
      role: "Frontend & Backend Engineer",
      imageUrl: "/assets/ka arnold ganteng.jpg",
      overlayColor: "bg-teal-500/80",
    },
    {
      id: 3,
      name: "Priskila Gabriela Supit",
      nim: 220211060109,
      role: "UX/UI Designers, Frontend, & Backend Engineer (LaTeX Template)",
      imageUrl: "/assets/makeupdesu.jpg",
      overlayColor: "bg-red-500/80",
    },
  ];

  return(
    <div className="w-full px-4 sm:px-0 sm:h-[600px] sm:w-[1200px] mt-10 flex justify-center">
      <div className="hidden sm:grid h-full w-full gap-4 p-2 grid-cols-3 grid-rows-2 rounded-lg shadow-md">
        <div 
          className="col-span-1 row-span-2 rounded-lg shadow-md relative overflow-hidden"
          onMouseEnter={() => setIsHovered(1)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <div className="absolute inset-0 w-full h-full">
            <img
              src={teamBentoProps[0].imageUrl}
              alt={teamBentoProps[0].name}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div 
            className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end p-6 ${
              isHovered === 1 ? 'opacity-100' : 'opacity-0'
            } ${teamBentoProps[0].overlayColor}`}
          >
            <h3 className="text-white text-2xl font-bold">{teamBentoProps[0].name}</h3>
            <p className="text-white/90 mt-2">{teamBentoProps[0].nim}</p>
            <p className="text-white/90 mt-2">{teamBentoProps[0].role}</p>
          </div>
        </div>
        
        <div 
          className="col-span-2 row-span-1 rounded-lg shadow-md relative overflow-hidden"
          onMouseEnter={() => setIsHovered(2)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <div className="absolute inset-0 w-full h-full">
            <img
              src={teamBentoProps[1].imageUrl}
              alt={teamBentoProps[1].name}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div 
            className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end p-6 ${
              isHovered === 2 ? 'opacity-100' : 'opacity-0'
            } ${teamBentoProps[1].overlayColor}`}
          >
            <h3 className="text-white text-2xl font-bold">{teamBentoProps[1].name}</h3>
            <p className="text-white/90 mt-2">{teamBentoProps[1].nim}</p>
            <p className="text-white/90 mt-2">{teamBentoProps[1].role}</p>
          </div>
        </div>
        
        <div 
          className="col-span-2 row-span-1 rounded-lg shadow-md relative overflow-hidden"
          onMouseEnter={() => setIsHovered(3)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <div className="absolute inset-0 w-full h-full">
            <img
              src={teamBentoProps[2].imageUrl}
              alt={teamBentoProps[2].name}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div 
            className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end p-6 ${
              isHovered === 3 ? 'opacity-100' : 'opacity-0'
            } ${teamBentoProps[2].overlayColor}`}
          >
            <h3 className="text-white text-2xl font-bold">{teamBentoProps[2].name}</h3>
            <p className="text-white/90 mt-2">{teamBentoProps[2].nim}</p>
            <p className="text-white/90 mt-2">{teamBentoProps[2].role}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col w-full gap-4 sm:hidden">
        {teamBentoProps.map((member) => (
          <div 
            key={member.id}
            className="w-full h-64 rounded-lg shadow-md relative overflow-hidden"
            onMouseEnter={() => setIsHovered(member.id)}
            onMouseLeave={() => setIsHovered(null)}
            onTouchStart={() => setIsHovered(member.id === isHovered ? null : member.id)}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={member.imageUrl}
                alt={member.name}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div 
              className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-end p-6 ${
                isHovered === member.id ? 'opacity-100' : 'opacity-0'
              } ${member.overlayColor}`}
            >
              <h3 className="text-white text-xl font-bold">{member.name}</h3>
              <p className="text-white/90 mt-1">{member.nim}</p>
              <p className="text-white/90 mt-1">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}