export interface Infrastruktur {
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

export const infrastrukturDummy: Infrastruktur[] = [
  {
    id: 1,
    itemName: "Proyektor Epson",
    category: "Elektronik",
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: true,
    timeFrame: {
      start: "",
      end: "",
    },
    description: "Proyektor untuk presentasi dengan resolusi HD"
  },
  {
    id: 2,
    itemName: "Laptop Dell Latitude",
    category: "Komputer",
    location: "Gedung Jurusan Teknik Elektro, Lantai 2",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
    description: "Laptop untuk keperluan akademik"
  },
  {
    id: 3,
    itemName: "Papan Tulis Digital",
    category: "Peralatan Pembelajaran",
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
    description: "Papan tulis interaktif untuk pembelajaran"
  },
  {
    id: 4,
    itemName: "Sound System JBL",
    category: "Audio",
    location: "Gedung Jurusan Teknik Elektro, Lantai 3",
    isAvailable: true,
    timeFrame: {
      start: "",
      end: "",
    },
    description: "Sistem audio untuk acara dan presentasi"
  },
  {
    id: 5,
    itemName: "Kamera DSLR Canon",
    category: "Fotografi",
    location: "Gedung Jurusan Teknik Elektro, Lantai 2",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
    description: "Kamera untuk dokumentasi acara"
  },
  {
    id: 6,
    itemName: "Printer HP LaserJet",
    category: "Pencetakan",
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: true,
    timeFrame: {
      start: "",
      end: "",
    },
    description: "Printer laser untuk keperluan cetak dokumen"
  },
  {
    id: 7,
    itemName: "Scanner Epson",
    category: "Pemindaian",
    location: "Gedung Jurusan Teknik Elektro, Lantai 2",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
    description: "Scanner untuk digitalisasi dokumen"
  },
  {
    id: 8,
    itemName: "Mikrofon Wireless",
    category: "Audio",
    location: "Gedung Jurusan Teknik Elektro, Lantai 3",
    isAvailable: true,
    timeFrame: {
      start: "",
      end: "",
    },
    description: "Mikrofon nirkabel untuk presentasi"
  },
  {
    id: 9,
    itemName: "Tablet iPad",
    category: "Komputer",
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
    description: "Tablet untuk demonstrasi dan presentasi"
  },
  {
    id: 10,
    itemName: "LED Display Panel",
    category: "Display",
    location: "Gedung Jurusan Teknik Elektro, Lantai 2",
    isAvailable: true,
    timeFrame: {
      start: "",
      end: "",
    },
    description: "Panel LED untuk display informasi"
  }
]; 