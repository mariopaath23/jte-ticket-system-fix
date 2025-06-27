export interface Ruangan {
  id: number;
  roomName: string;
  roomCapacity: number;
  location: string;
  isAvailable: boolean;
  timeFrame?: {
    start?: string;
    end?: string;
  };
}

export const ruanganDummy: Ruangan[] = [
  {
    id: 1,
    roomName: "Auditorium Dekanat",
    roomCapacity: 150,
    location: "Gedung Dekanat Fakultas Teknik, Lantai 5",
    isAvailable: true,
    timeFrame: {
      start: "",
      end: "",
    },
  },
  {
    id: 2,
    roomName: "Creative Room",
    roomCapacity: 150,
    location: "Gedung Jurusan Teknik Elektro, Lantai 2",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 3,
    roomName: "JTE-1",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 4,
    roomName: "JTE-2",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 5,
    roomName: "JTE-3",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 6,
    roomName: "JTE-4",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 7,
    roomName: "JTE-5",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 8,
    roomName: "JTE-6",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 9,
    roomName: "JTE-7",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 1",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 10,
    roomName: "JTE-8",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 3",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
  {
    id: 11,
    roomName: "JTE-9",
    roomCapacity: 30,
    location: "Gedung Jurusan Teknik Elektro, Lantai 3",
    isAvailable: false,
    timeFrame: {
      start: "2025-04-07T13:39:37.000Z",
      end: "2025-04-07T15:39:37.000Z",
    },
  },
]; 