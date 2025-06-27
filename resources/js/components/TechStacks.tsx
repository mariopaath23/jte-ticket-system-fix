export default function TechStacks(){
  return(
    <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row sm:gap-10 sm:flex-wrap">
      <div className="flex flex-col items-center justify-center gap-4 max-w-60 h-[300px] text-[#5C5346] bg-[#F9F6EE] rounded-lg shadow-md p-4">
        <div className="flex items-center max-w-[200px] h-[150px] ">
          <img
            src="/next.svg"
            alt="Next.js"
            width={200}
            height={200}
          />
        </div>
        <p>Powerful Web Development Framework with Server-side Rendering Capabilities</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-60 h-[300px] text-[#5C5346] bg-[#F9F6EE] rounded-lg shadow-md p-4">
        <div className="flex items-center max-w-[200px] h-[150px] ">
          <img
            src="/tailwind2.svg"
            alt="Tailwind CSS"
            width={200}
            height={200}
          />
        </div>
        <p>A Utility-first, mobile-first CSS Framework</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-60 h-[300px] text-[#5C5346] bg-[#F9F6EE] rounded-lg shadow-md p-4">
        <div className="flex items-center max-w-[200px] h-[150px] ">
          <img
            src="/shadcn.svg"
            alt="Shadcn UI"
            width={50}
            height={50}
            onClick={() => window.open("https://ui.shadcn.com", "_blank")}
          />
          <span className="font-bold">shadcn/ui</span>
        </div>
        <p>Build-your-own UI Component Library</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-60 h-[300px] text-[#5C5346] bg-[#F9F6EE] rounded-lg shadow-md p-4">
        <div className="flex items-center max-w-[200px] h-[150px] ">
          <img
            src="/typescript.svg"
            alt="TypeScript"
            width={50}
            height={50}
          />
          <span className="font-bold">TypeScript</span>
        </div>
        <p>JavaScript with syntax for types</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-60 h-[300px] text-[#5C5346] bg-[#F9F6EE] rounded-lg shadow-md p-4">
        <div className="flex items-center max-w-[200px] h-[150px] ">
          <img
            src="/radix-ui.svg"
            alt="Radix UI"
            width={50}
            height={50}
          />
          <span className="font-bold">radix-ui/react-icons</span>
        </div>
        <p>Open source component, icons, primitives library</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-60 h-[300px] text-[#5C5346] bg-[#F9F6EE] rounded-lg shadow-md p-4">
        <div className="flex items-center max-w-[200px] h-[150px] ">
          <img
            src="/laravel.svg"
            alt="Laravel"
            width={50}
            height={50}
          />
        </div>
        <p>PHP web application framework with expressive, elegant syntax.</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-60 h-[300px] text-[#5C5346] bg-[#F9F6EE] rounded-lg shadow-md p-4">
        <div className="flex items-center max-w-[200px] h-[150px] ">
          <img
            src="/postgresql.svg"
            alt="PostgreSQL"
            width={200}
            height={200}
          />
        </div>
        <p>Powerful, open source object-relational database system</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-60 h-[300px] text-[#5C5346] bg-[#F9F6EE] rounded-lg shadow-md p-4">
        <div className="flex items-center max-w-[200px] h-[150px] ">
          <img
            src="/LaTeX.svg"
            alt="LaTeX"
            width={150}
            height={150}
          />
        </div>
        <p>A document preparation system</p>
      </div>
    </div>
  );
}