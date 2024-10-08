/* eslint-disable prettier/prettier */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation } from "@/hooks/useLocation";
import debounce from "debounce";
import { Location } from "@/interfaces/trip";

export interface AutocompleteLocationProps {
  name?: string;
  label?: string;
  keyCode?: keyof Location;
  onChange?: (value: Location | null) => void;
}

export function AutocompleteLocation({
  name = "locationCode",
  label = "Cód. localização",
  keyCode = "code",
}: AutocompleteLocationProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const isDirty = dirtyFields[name];
  const { locations, error } = useLocation({
    pageSize: 10,
    code: isDirty ? watch(name) : "",
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          forcePopupIcon={false}
          clearOnEscape
          options={locations || []}
          loadingText="Carregando..."
          defaultValue={{ code: field.value || "" } as Location}
          isOptionEqualToValue={(option: Location, value: Location) =>
            option[keyCode] === value[keyCode]
          }
          onChange={(_, value) => {
            setValue(name, value?.[keyCode] || "");
          }}
          noOptionsText={
            !field.value
              ? "Digite o código"
              : !locations && !error
                ? "Carregando..."
                : "Nenhum resultado encontrado"
          }
          getOptionLabel={(option: Location) => option.code}
          renderInput={(params) => (
            <TextField
              {...field}
              {...params}
              onChange={debounce(field.onChange, 300)}
              variant="outlined"
              fullWidth
              label={label}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message?.toString()}
            />
          )}
        />
      )}
    />
  );
}
