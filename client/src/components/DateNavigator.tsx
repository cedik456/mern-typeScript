type Props = {
  viewDate: Date;
  setViewDate: (date: Date) => void;
};

const fmt = (d: Date) => d.toISOString().slice(0, 10);

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
    <div>
      <button onClick={() => changeDay(-1)}>Previous</button>

      <span>{fmt(viewDate)}</span>

      <button onClick={() => changeDay(1)} disabled={isToday}>
        Next
      </button>
    </div>
  );
}
