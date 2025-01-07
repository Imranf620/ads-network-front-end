import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select"; // Import SelectChangeEvent
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { requestForAds } from "../../features/userSlice";
import { toast } from "react-toastify";
import MyRequests from "../../components/myRequests/MyRequests";

const Monitizers = () => {
  const [adType, setAdType] = useState("");
  const [details, setDetails] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useAppDispatch();
  const handleAdTypeChange = (event: SelectChangeEvent<string>) => {
    setAdType(event.target.value);
  };

 
  const handleDetailsChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setDetails(event.target.value as string);
  };

  const handleRequestSubmit = async () => {
    const res = await dispatch(
      requestForAds({ adType, domainDesc: details })
    );
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
                <FormControl fullWidth margin="normal">
                  <InputLabel id="ad-type-label">Ad Type</InputLabel>
                  <Select
                    labelId="ad-type-label"
                    id="ad-type"
                    value={adType}
                    onChange={handleAdTypeChange} 
                    label="Ad Type"
                    fullWidth
                  >
                    <MenuItem value="button-ad">Button Ad</MenuItem>
                    <MenuItem value="popup-ad">Pop-up Ad</MenuItem>
                    {/* Add other ad types if needed */}
                  </Select>
                </FormControl>
              </Grid>


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
