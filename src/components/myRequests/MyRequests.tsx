import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { myRequestsForAd } from "../../features/userSlice";
import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
 
  const [embedCode, setEmbedCode] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await dispatch(myRequestsForAd());
        console.log(res.payload);

        if (res.payload.success) {
          setRequests(res.payload.data.allRequestsForAd);
         
        }
      } catch (error) {
        console.error("Error fetching requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [dispatch]);

  // Function to generate the embed code
  const generateEmbedCode = (domain: string, adType: string, CId:string) => {
    console.log("user", CId)

    const url = `${domain}?CID=${encodeURIComponent(CId)}`;
    console.log("url", url)
    const encodedUrl = btoa(url);
    if (adType === "button-ad") {
      return `<script>
        const button = document.createElement('button');
        button.innerText = 'Download';
        button.onclick = () => {
          const encodedUrl = '${encodedUrl}'; 
          const decodedUrl = atob(encodedUrl); 
          window.open(decodedUrl);
        };
        document.body.appendChild(button);
      </script>`;
    } else if (adType === "popup-ad") {
      return `<script>
        const button = document.createElement('button');
        button.innerText = 'Download';
        button.onclick = () => {
          const encodedUrl = '${encodedUrl}'; 
          const decodedUrl = atob(encodedUrl); 
          window.open(decodedUrl, '_blank');
        };
        document.body.appendChild(button);
      </script>`;
    }
    return ""; // Return an empty string if no matching adType
  };

  const handleCopyEmbedCode = (embedCode: string) => {
    navigator.clipboard
      .writeText(embedCode)
      .then(() => {
        setCopySuccess(true); 
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  const handleDialogOpen = (request: any) => {
    const embedCode = generateEmbedCode(
      request.assignedDomain.domain,
      request.adType,
      request.CId,
    );
    setEmbedCode(embedCode);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">
        My Ad Requests
      </h2>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request: any) => (
            <Card
              key={request._id}
              className="shadow-lg rounded-lg border border-gray-200 p-4 bg-white"
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h3"
                  className="font-bold mb-2"
                >
                  Ad Type: {request.adType}
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-1">
                  <strong>Domain:</strong> {request.domain}
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-1">
                  <strong>Description:</strong> {request.domainDesc}
                </Typography>
                {/* <Typography variant="body1" className="text-gray-600 mb-1">
                  <strong>Client ID:</strong> {request.CId}
                
                </Typography> */}
                <Typography variant="body1" className="text-gray-600 mb-1">
                  <strong>Requested At:</strong>{" "}
                  {new Date(request.requestForAdAt).toLocaleString()}
                </Typography>
                <Typography
                  variant="body1"
                  className={`text-sm font-semibold ${
                    request.approved ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  <strong>Status:</strong>{" "}
                  {request.approved ? "Approved" : "Pending"}
                </Typography>

                {request.approved && request.assignedDomain && (
                  <div className="mt-4">

                    <Typography>
                      Total Cicks:
                    {request.totalClicks}

                    </Typography>
                  </div>
                )}

                {/* Show "Copy Embed Code" button if the request is approved */}
                {request.approved && request.assignedDomain && (
                  <div className="mt-4">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDialogOpen(request)}
                    >
                      Copy Embed Code
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600">
          No requests found.
        </div>
      )}

      {/* Snackbar to show success message */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
        message="Embed code copied to clipboard!"
      />

      {/* Dialog for Embed Code */}
      <Dialog open={openDialog} fullWidth   onClose={handleDialogClose}>
        <DialogTitle>Embed Code</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            value={embedCode}
            InputProps={{
              readOnly: true,
            }}
            rows={6}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCopyEmbedCode(embedCode)}
          >
            Copy Code
          </Button>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyRequests;
