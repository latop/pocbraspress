import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { useDailyTripsByPeriod } from "@/hooks/useDailyTripsByPeriod";

dayjs.extend(customParseFormat);

interface FormFields {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  fleetGroupCode?: string;
}

const dateOrDayjsSchema = z.custom(
  (val) => val instanceof Date || dayjs.isDayjs(val),
  {
    message: "Data é obrigatório",
  },
);

const schema = z
  .object({
    startDate: dateOrDayjsSchema,
    endDate: dateOrDayjsSchema,
    fleetGroupCode: z.string().optional(),
  })
  .refine(
    (data) => {
      const { startDate, endDate } = data;
      if (dayjs(startDate as Dayjs | Date).isAfter(endDate as Dayjs | Date)) {
        return false;
      }
      const diffDays = dayjs(endDate as Dayjs | Date).diff(
        dayjs(startDate as Dayjs | Date),
        "day",
      );

      return diffDays <= 45;
    },
    {
      message: "O intervalo entre as datas deve ser de no máximo 45 dias",
      path: ["startDate"],
    },
  );

export function useDailyTripsByPeriodFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { refetch: refetchDailyTrips } = useDailyTripsByPeriod();
  const params = useSearchParams();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: params.get("startDate")
        ? dayjs(params.get("startDate"))
        : dayjs(),
      endDate: params.get("endDate")
        ? dayjs(params.get("endDate"))
        : dayjs().add(7, "days"),
      fleetGroupCode: params.get("fleetGroupCode") || "",
    },
  });

  const onSubmit = (data: FormFields) => {
    const query = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value?.isValid?.()) {
        query.append(key, dayjs(value).format("MM-DD-YYYY"));
      } else if (value) {
        query.append(key, value);
      }
    });

    const newUrl = `/daily-trips-schedule?${query.toString()}`;
    const oldUrl = `${pathname}?${params.toString()}`;
    if (oldUrl === newUrl) {
      refetchDailyTrips();
    } else {
      router.push(newUrl);
    }
  };

  return {
    methods,
    onSubmit,
  };
}
