"use client";
import { AppBar } from "@/components/AppBar";
import { HeaderTitle } from "@/components/HeaderTitle/HeaderTitle";
import { ImportTripsFilterBar } from "@/components/ImportTripsFilterBar";
import { MainContainer } from "@/components/MainContainer";
import { useImportTrips } from "@/hooks/useImportTrips";
import { ImportTripsResponseItem } from "@/interfaces/import-trips";
import { Box, Button, Card, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { UploadTripFileForm } from "@/components/UploadTripFileForm/UploadTripForm";
import DeleteIcon from "@mui/icons-material/Delete";

export function ImportTrips() {
  const { data, isLoading, hasParamsToSearch, handleDeleteDemand } =
    useImportTrips();

  const columns: GridColDef[] = [
    {
      field: "FileName",
      headerName: "Nome do Arquivo",
      width: 300,
      valueGetter: (_, data: ImportTripsResponseItem) => {
        return data.FileName ? data.FileName.split(".xlsx")[0] : "N/A";
      },
    },
    {
      field: "LocationCode",
      headerName: "Cód. Loc",
      width: 100,
    },
    {
      field: "CreateAt",
      headerName: "Data criação",
      width: 200,
      valueGetter: (_, data: ImportTripsResponseItem) => {
        return dayjs(data.CreateAt).format("DD-MM-YY HH:mm");
      },
    },
    {
      field: "action",
      headerName: "Ações",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleDeleteDemand(params.id as string)}
            variant="text"
          >
            <DeleteIcon color="error" />
          </Button>
        );
      },
    },
  ];

  const Content = () => {
    if (isLoading && hasParamsToSearch) return <CircularProgress />;
    if (data?.length)
      return (
        <DataGrid
          columns={columns}
          rows={data || []}
          getRowId={(row) => row.Id}
        />
      );
    return null;
  };
  return (
    <MainContainer
      sx={{
        overflow: "hidden",
      }}
    >
      <AppBar style={{ display: "block" }}>
        <HeaderTitle>Importação de viagens</HeaderTitle>
      </AppBar>
      <Box
        sx={{
          width: "100%",
          padding: "20px",
          height: "100vh",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={2}
          justifyContent={"space-between"}
          minHeight={"64px"}
          alignItems={"flex-start"}
        >
          <ImportTripsFilterBar />
          <UploadTripFileForm />
        </Box>

        <Card
          sx={{
            width: "100%",
            height: data?.length ? "calc(100% - 116px)" : "90%",
          }}
        >
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Content />
          </Box>
        </Card>
      </Box>
    </MainContainer>
  );
}
