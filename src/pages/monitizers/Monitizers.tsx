import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { requestForAds } from "../../features/userSlice";
import { toast } from "react-toastify";
import MyRequests from "../../components/myRequests/MyRequests";

const Monitizers = () => {
  const [details, setDetails] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useAppDispatch();

  const handleDetailsChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setDetails(event.target.value as string);
  };

  const handleRequestSubmit = async () => {
    const res = await dispatch(requestForAds({ domainDesc: details }));
    console.log(res);
    if (res.payload.success) {
      toast.success(res.payload.message);
    } else {
      toast.error(res.payload);
    }

    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-between ">
        <Button
          variant="contained"
          color="primary"
          startIcon={<NotificationsIcon />}
          onClick={handleOpenDialog}
          style={{ marginBottom: "20px" }}
        >
          Request Monetization
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<NotificationsIcon />}
          onClick={handleOpenDialog}
          style={{ marginBottom: "20px" }}
        >
          Stats
        </Button>
      </div>

      <Typography variant="h5" align="center" style={{ marginBottom: "20px" }}>
        Monetization Options
      </Typography>

      {/* Pop-up for Monetization Request */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Request Monetization</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
          

              <Grid item xs={12}>
                <TextField
                  label="Additional Details (optional)"
                  variant="outlined"
                  fullWidth
                  value={details}
                  onChange={handleDetailsChange}
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRequestSubmit} color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
      <MyRequests />
    </div>
  );
};

export default Monitizers;
