import React, { useState } from "react";
import { uploadFile } from "../../features/domainsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toast } from "react-toastify";
import {
  Button,
  TextField,
  Typography,
  Modal,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

interface Component {
  selectedDomain: string;
  setUploadMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DriveFolderUploadModel: React.FC<Component> = ({
  selectedDomain,
  setUploadMode,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [urlUpload, setUrlUpload] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_URL.endsWith("/")
    ? import.meta.env.VITE_API_URL.slice(0, -1)
    : import.meta.env.VITE_API_URL;

  const dispatch = useAppDispatch();

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  console.log("apibase", apiBaseUrl);

  };

  const uploadData = async () => {
    let uploadedViaS3 = false;
    let fileName = file?.name || "";
    let url = fileUrl;
    console.log("apibase", apiBaseUrl);

    setLoading(true);

    if (!urlUpload && file) {
      try {
        // Check and delete existing file if necessary
        const res = await axios.post(
          `${apiBaseUrl}/file/check-and-delete`,
          { domainId: selectedDomain, fileName },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("delete and check", res);

        const preSignedResponse = await axios.post(
          `${apiBaseUrl}/file/get-preassignedulr`,
          { filename: fileName, fileType: file.type },
          { withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
           }
        );
        console.log("pre signed url", preSignedResponse);

        url = preSignedResponse.data.url;

        const uploadedRes = await axios.put(url, file, {
          headers: { "Content-Type": file.type },
        });
        console.log("uploaded via s3", uploadedRes);
        uploadedViaS3 = true;
      } catch (error) {
        console.error("Error during file upload process:", error);
        toast.error("Failed to upload file");
        return;
      }
    }

    if ((!file && !urlUpload) || (urlUpload && !fileUrl)) {
      toast.error("Please select a file or enter a URL to upload");
      return;
    }

    try {
      const res = await dispatch(
        uploadFile({
          domainId: selectedDomain,
          pass: password || undefined,
          file: uploadedViaS3 ? file : undefined, // Send only filename if uploaded via S3
          fileUrl: uploadedViaS3 ? undefined : url, // Only send URL if user manually enters one
        })
      );
      console.log("uploadFile", res);

      if (res?.payload?.success) {
        toast.success(res?.payload?.message);
        setUploadMode(false);
      } else {
        toast.error(res?.payload?.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading the file");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUploadMode(false);
  };

  return (
    <Modal
      open
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          width: "100%",
          maxWidth: 400,
          boxShadow: 3,
        }}
      >
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <Button
            sx={{
              flex: 1,
              backgroundColor: !urlUpload ? "#3b82f6" : "#e5e7eb",
              color: !urlUpload ? "#ffffff" : "#000000",
              "&:hover": {
                backgroundColor: !urlUpload ? "#2563eb" : "#d1d5db",
              },
            }}
            onClick={() => setUrlUpload(false)}
          >
            File
          </Button>
          <Button
            sx={{
              flex: 1,
              backgroundColor: urlUpload ? "#3b82f6" : "#e5e7eb",
              color: urlUpload ? "#ffffff" : "#000000",
              "&:hover": {
                backgroundColor: urlUpload ? "#2563eb" : "#d1d5db",
              },
            }}
            onClick={() => setUrlUpload(true)}
          >
            URL
          </Button>
        </div>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Upload to Domain: {selectedDomain}
        </Typography>
        {!urlUpload ? (
          <TextField
            type="file"
            onChange={selectFile}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
        ) : (
          <TextField
            type="url"
            label="File URL"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            sx={{ width: "100%", marginBottom: 2 }}
          />
        )}
        <Box sx={{ position: "relative", marginBottom: 2 }}>
          <TextField
            type={showPassword ? "text" : "password"}
            label="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        {fileName && (
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Selected File: {fileName}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={uploadData}
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              color: "white",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
              width: "48%",
            }}
            disabled={
              loading || (!file && !urlUpload) || (urlUpload && !fileUrl)
            }
          >
            {loading ? (
              <>
                Uploading...{" "}
                <CircularProgress size={24} sx={{ marginLeft: 1 }} />
              </>
            ) : (
              "Upload"
            )}
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": {
                backgroundColor: "#e53935",
              },
              width: "48%",
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DriveFolderUploadModel;
