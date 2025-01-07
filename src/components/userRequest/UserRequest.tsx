import { Button, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AllBtnDomains from '../allBtnDomains/AllBtnDomains';

interface UserRequestProps {
  actionRequest: any;
  setActionRequestModel: React.Dispatch<React.SetStateAction<boolean>>;
  userId:string
}

const UserRequest: React.FC<UserRequestProps> = ({ actionRequest, setActionRequestModel, userId }) => {
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
 
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setActionRequestModel(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActionRequestModel(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setActionRequestModel]);

  // Function to handle the "Assign" button click
  const handleAssignClick = () => {
    setIsDomainModalOpen(true); // Open the domain modal
  };

  // Function to handle closing the domain modal
  const handleDomainModalClose = () => {
    setIsDomainModalOpen(false); // Close the domain modal
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0, 0, 0, 0.5)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={handleBackdropClick}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',  // Align text to the left
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Request Details
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
            <strong>Domain:</strong> {actionRequest.domain}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
            <strong>Description:</strong>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                marginTop: 0.5,
                whiteSpace: 'pre-line', // Ensure long descriptions are properly wrapped
              }}
            >
              {actionRequest.domainDesc}
            </Typography>
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
            <strong>Requested At:</strong>  {new Date(actionRequest.requestForAdAt).toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" color={actionRequest.approved ? 'success.main' : 'error.main'}>
            <strong>Status:</strong> {actionRequest.approved ? 'Approved' : 'Not Approved'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color={actionRequest.approved ? 'secondary' : 'primary'}
            onClick={handleAssignClick} // Open domain modal when clicked
          >
            {actionRequest.approved ? 'Disconnect' : 'Assign'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setActionRequestModel(false)}
          >
            Close
          </Button>
        </Box>
      </Box>

      {isDomainModalOpen && (
        <AllBtnDomains
          closeModal={handleDomainModalClose}
          requestId={actionRequest._id} 
          userId={userId}
        />
      )}
    </Box>
  );
};

export default UserRequest;
