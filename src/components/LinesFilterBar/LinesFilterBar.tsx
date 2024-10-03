"use client";

import React from "react";
import dayjs from "dayjs";
import { Controller, FormProvider } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { useLinesFilterBar } from "./useLinesFilterBar";
import SearchIcon from "@mui/icons-material/Search";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/pt-br";
import { AutocompleteFleetGroup } from "../AutocompleteFleetGroup";
import { AutocompleteLocation } from "../AutocompleteLocation";
import { FleetGroup } from "@/interfaces/vehicle";

dayjs.extend(customParseFormat);

export function LinesFilterBar(props: React.HTMLProps<HTMLFormElement>) {
  const { methods, onSubmit } = useLinesFilterBar();
  const { control, handleSubmit, setValue } = methods;

  const handleChangeFleetGroup = (value: FleetGroup | null) => {
    setValue("fleetGroupId", value?.id || "");
    setValue("fleetGroupCode", value?.code || "");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container alignItems="flex-start" width="100%" gap="16px">
              <Grid item xs={2} paddingLeft="0">
                <AutocompleteFleetGroup onChange={handleChangeFleetGroup} />
              </Grid>
              <Grid item xs={1.6} paddingLeft="0">
                <Controller
                  name="code"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Código"
                      error={!!error?.message}
                      helperText={error?.message?.toString()}
                      inputProps={{
                        sx: {
                          textTransform: "uppercase",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1.7} paddingLeft="0">
                <AutocompleteLocation
                  name="locationOrigId"
                  label="Origem"
                  keyCode="id"
                />
              </Grid>
              <Grid item xs={1.6} paddingLeft="0">
                <AutocompleteLocation
                  name="locationDestId"
                  label="Destino"
                  keyCode="id"
                />
              </Grid>
            </Grid>
            <Grid item xs={1} justifySelf={"flex-end"}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                fullWidth
              >
                <SearchIcon />
              </Button>
            </Grid>
          </div>
        </form>
      </FormProvider>
    </LocalizationProvider>
  );
}
