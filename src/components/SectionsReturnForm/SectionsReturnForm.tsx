import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Grid } from "@mui/material";
import { DateTimePicker } from "@/components/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { AutocompleteLocation } from "@/components/AutocompleteLocation";

dayjs.extend(customParseFormat);
interface SectionsReturnFormProps {
  taskDriverSeq: number;
  seq: number;
}

export const SectionsReturnForm = ({
  seq,
  taskDriverSeq,
}: SectionsReturnFormProps) => {
  const { control } = useFormContext();
  const taskDriver = `tasksDriver.${taskDriverSeq}`;
  return (
    <Grid
      container
      spacing={1}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Grid item xs={1.5}>
        <Controller
          name={`${taskDriver}.sectionsReturn.${seq}.licensePlate`}
          control={control}
          render={({ field }) => (
            <TextField
              disabled
              {...field}
              label="Placa"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <AutocompleteLocation
          name={`${taskDriver}.sectionsReturn.${seq}.locOrig`}
          label="Origem"
        />
      </Grid>
      <Grid item xs={1.7}>
        <AutocompleteLocation
          name={`${taskDriver}.sectionsReturn.${seq}.locDest`}
          label="Destino"
        />
      </Grid>
      <Grid item xs={1.7}>
        <Controller
          name={`${taskDriver}.sectionsReturn.${seq}.startPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              disabled
              label="Início planejado"
              disableOpenPicker
              error={error?.message}
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.7}>
        <Controller
          name={`${taskDriver}.sectionsReturn.${seq}.endPlanned`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim planejado"
              error={error?.message}
              disableOpenPicker
              disabled
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.6}>
        <Controller
          name={`${taskDriver}.sectionsReturn.${seq}.startActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Início realizado"
              error={error?.message}
              disableOpenPicker
              disabled
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
              slotProps={{ textField: { InputLabelProps: { shrink: true } } }}
            />
          )}
        />
      </Grid>
      <Grid item xs={1.6}>
        <Controller
          name={`${taskDriver}.sectionsReturn.${seq}.endActual`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Fim realizado"
              disableOpenPicker
              error={error?.message}
              disabled
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => field.onChange(date?.format())}
              slotProps={{ textField: { InputLabelProps: { shrink: true } } }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
