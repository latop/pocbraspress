import React from "react";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";
import theme from "@/styles/theme";
import { Box, CircularProgress, Typography, Button, Icon } from "@mui/material";
import { useJourneyFormFooter } from "./useJourneyFormFooter";

interface JourneyFormFooterProps {
  loading: boolean;
}

export function JourneyFormFooter({ loading = false }: JourneyFormFooterProps) {
  const { handleAddTravel, handleAddActivity } = useJourneyFormFooter();

  return (
    <DialogActions>
      <Box
        display="flex"
        justifyContent="space-between"
        padding="10px"
        width="100%"
      >
        <Box display="flex" gap="10px">
          <Button
            variant="outlined"
            onClick={handleAddTravel}
            color="primary"
            size="small"
          >
            <Icon component={AddIcon} fontSize="small" />
            <Typography
              variant="body2"
              ml="5px"
              color={theme.palette.primary.main}
            >
              Viagem
            </Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={handleAddActivity}
            color="primary"
            size="small"
          >
            <Icon component={AddIcon} fontSize="small" />
            <Typography
              variant="body2"
              ml="5px"
              color={theme.palette.primary.main}
            >
              Atividade
            </Typography>
          </Button>
        </Box>
        <Box display="flex" gap="10px">
          <Button type="submit" variant="contained">
            {loading && (
              <CircularProgress
                color="inherit"
                size={20}
                sx={{ margin: "2px 11.45px" }}
              />
            )}
            {!loading && `Salvar`}
          </Button>
        </Box>
      </Box>
    </DialogActions>
  );
}
