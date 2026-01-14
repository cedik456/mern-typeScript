import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  viewDate: Date;
  setViewDate: (date: Date) => void;
};

const fmt = (d: Date) =>
  d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function DateNavigator({ viewDate, setViewDate }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const changeDay = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setDate(newDate.getDate() + offset);
    setViewDate(newDate);
  };

  const isToday = fmt(viewDate) === fmt(today);

  return (
    <div className="flex justify-between items-center mb-6 text-gray-500">
      <button onClick={() => changeDay(-1)}>
        <ChevronLeft className="w-5 h-5 hover:text-gray-800 hover:cursor-pointer" />
      </button>

      <span>{fmt(viewDate)}</span>

      <button onClick={() => changeDay(1)} disabled={isToday}>
        <ChevronRight className="w-5 h-5 hover:text-gray-800 hover:cursor-pointer" />
      </button>
    </div>
  );
}
