import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionHome() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="font-semibold">Apa itu Sistem Manajemen Tiket JTE?</span>
          </AccordionTrigger>
        <AccordionContent>
          Sistem Manajemen Tiket JTE adalah aplikasi yang dirancang untuk menangani kebutuhan Mahasiswa maupun Ormawa dalam pengajuan izin peminjaman infrastruktur di Jurusan Teknik Elektro, Universitas Sam Ratulangi
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger><span className="font-semibold">Apa fitur yang ditawarkan dalam Sistem Manajemen Tiket JTE?</span></AccordionTrigger>
        <AccordionContent>
          Sistem Manajemen Tiket JTE memiliki fitur sebagai berikut:
          <ul className="list-disc pl-5">
            <li>Pengajuan Tiket Peminjaman Ruangan</li>
            <li>Pengajuan Tiket Peminjaman Inventaris Kampus</li>
            <li>Penerbitan Surat Peminjaman</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
            <span className="font-semibold">Bagaimana memastikan surat yang diterbitkan Sistem Manajemen Tiket JTE adalah orisinil dan tidak direkayasa?</span>
        </AccordionTrigger>
        <AccordionContent>
          Surat izin (Tiket) yang diterbitkan Sistem Manajemen Tiket JTE tidak pernah disimpan ke dalam database. Database kami hanya menyimpan informasi terkait kapan, siapa, dan untuk keperluan apa surat tersebut diterbitkan. Kemudian, sistem akan menerbitkan surat berdasarkan template LaTeX yang dapat diunduh dalam format PDF. <span className="italic">Thanks, LaTeX{"!"}</span>
        </AccordionContent>
      </AccordionItem>
  </Accordion>
  );
}