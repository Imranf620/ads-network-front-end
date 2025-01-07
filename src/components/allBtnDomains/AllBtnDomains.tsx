import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllDomains } from "../../features/domainsSlice";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { approveAdsRequest } from "../../features/userSlice";
import { toast } from "react-toastify";

const AllBtnDomains = ({
  closeModal,
  requestId,
  userId,
}: {
  closeModal: () => void;
  requestId: string;
  userId: string;
}) => {
  const dispatch = useAppDispatch();
  const [allDomains, setAllDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log(userId);

  console.log(requestId);

  useEffect(() => {
    const fetchAllDomains = async () => {
      setLoading(true);
      setError(null);
      try {
        const resultAction = await dispatch(getAllDomains());
        if (getAllDomains.fulfilled.match(resultAction)) {
          const buttonDomains = resultAction.payload.data.filter(
            (domain: any) => domain.type === "button"
          );
          setAllDomains(buttonDomains);
        } else {
          setError(resultAction.error.message || "Failed to fetch domains");
        }
      } catch {
        setError("Failed to fetch domains");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDomains();
  }, [dispatch]);

  // Handle search term input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtered domains based on search term
  const filteredDomains = allDomains.filter((domain) =>
    domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignDomain = async (domainId: string) => {
    const res = await dispatch(approveAdsRequest({ requestId, domainId, userId }));
    if (res.payload.success) {
        toast.success(res.payload.message);
     closeModal()
    } else {
        toast.error(res.payload);
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box
        sx={{
          width: 400,
          bgcolor: "white",
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select Domain to Assign
        </Typography>

        <TextField
          fullWidth
          label="Search Domain"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: 2 }}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
            {filteredDomains.length === 0 ? (
              <Typography>No domains found</Typography>
            ) : (
              filteredDomains.map((domain) => (
                <Box
                  key={domain._id}
                  sx={{
                    marginBottom: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1">{domain.domain}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAssignDomain(domain._id)}
                  >
                    Assign
                  </Button>
                </Box>
              ))
            )}
          </Box>
        )}

        <Button
          fullWidth
          variant="outlined"
          onClick={closeModal}
          sx={{ marginTop: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AllBtnDomains;
