import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  MapPin, 
  Tag,
  CalendarClock,
  Info
} from "lucide-react";
import { format } from "date-fns";

type InfrastrukturCardProps = {
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

export default function InfrastrukturCard({
  itemName,
  category,
  location,
  isAvailable,
  timeFrame,
  description,
}: InfrastrukturCardProps) {
  const formatTimeFrame = () => {
    if (!timeFrame?.start || !timeFrame?.end) return "-";

    try{
      const startDate = new Date(timeFrame.start);
      const endDate = new Date(timeFrame.end);
      return `${format(startDate, "dd/MM/yyyy HH:mm")} - ${format(endDate, "dd/MM/yyyy HH:mm")}`;
    } catch (error) {
      return "-";
    }
  };

  return(
    <Card>
      <CardHeader>
        <CardTitle>{itemName}</CardTitle>
        <CardDescription className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span>{category}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          {description && (
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5" />
              <span className="text-sm">{description}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-4 h-4" />
          <span>{formatTimeFrame()}</span>
        </div>
      </CardContent>
      <CardFooter>
        {isAvailable ? (
          <span 
            className="bg-green-300 rounded-full px-2 py-1 text-xs font-semibold text-green-800"
          >Tersedia</span>
        ):(
          <span 
          className="bg-red-300 rounded-full px-2 py-1 text-xs font-semibold text-red-800"
          >Tidak Tersedia</span>
        )}
      </CardFooter>
    </Card>
  );
}

export {}; 