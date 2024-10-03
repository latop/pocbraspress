import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { FC } from "react";
import { useReleaseDriverDialog } from "./useReleaseDriverDialog";
import { FieldValues, FormProvider } from "react-hook-form";
import { useDialog } from "@/hooks/useDialog/useDialog";
import CloseIcon from "@mui/icons-material/Close";
import { ReleaseDriverForm } from "./ReleaseDriverForm";
import dayjs from "dayjs";
import { useToast } from "@/hooks/useToast";

interface ReleaseDriverDialogProps {
  onClose: () => void;
  open: boolean;
}

export const ReleaseDriverDialog: FC<ReleaseDriverDialogProps> = ({
  onClose,
  open,
}) => {
  const { addToast } = useToast();

  const {
    methods,
    loading,
    driverAndTruckToRelase,
    updateReleaseDriver,
    mutate,
  } = useReleaseDriverDialog();
  const { openDialog } = useDialog();
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async (data: FieldValues) => {
    const body = {
      ...driverAndTruckToRelase,
      saida: data?.saida,
      entrega: data?.entrega,
      demanda: data?.demanda,
      destino: data?.destino,
      motoristaPlan: data?.motoristaPlan,
      veiculoPlan: data?.veiculoPlan,
      motoristaLiberado: data?.motoristaLiberado,
      veiculoLiberado: data?.veiculoLiberado,
      dtCheckList: dayjs().format(),
    };

    try {
      await updateReleaseDriver(body, {
        onSuccess: () => {
          mutate();
          addToast("Motorista liberado com sucesso");
        },
        onError: () => {
          addToast("Algo deu errado...", {
            type: "error",
          });
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    openDialog({
      body: "Deseja salvar as alterações?",
      onConfirm: () => {
        handleSubmit(onSubmit)();
        onClose();
      },
    });
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      PaperProps={{ sx: { maxWidth: "1200px" } }}
    >
      <FormProvider {...methods}>
        <form
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            <Box display="flex" justifyContent="space-between">
              Motorista para liberar
            </Box>
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ padding: "16px", height: "100%" }}>
            {loading && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="10px"
                height="100%"
                width="100%"
              >
                <CircularProgress />
              </Box>
            )}

            {!loading && <ReleaseDriverForm />}
          </DialogContent>
        </form>
        <DialogActions>
          <Box
            display="flex"
            justifyContent="flex-end"
            padding="10px"
            width="100%"
          >
            <Button type="submit" variant="contained" onClick={handleClose}>
              {isSubmitting && (
                <CircularProgress
                  color="inherit"
                  size={20}
                  sx={{ margin: "2px 11.45px" }}
                />
              )}
              {!isSubmitting && `Salvar`}
            </Button>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
