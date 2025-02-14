import  { useEffect, useState } from "react";
import { getAllDomains } from "../../features/domainsSlice";
import { getStats } from "../../features/userSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";

const Stats = () => {
  const dispatch = useAppDispatch();

  // States
  const [allDomains, setAllDomains] = useState<any>([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [domainId, setDomainId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const fetchAllDomains = async () => {
      try {
        const resultAction = await dispatch(getAllDomains());
        if (getAllDomains.fulfilled.match(resultAction)) {
          setAllDomains(resultAction.payload.data.filter((data) => data.type === 'button'));
    
        }
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchAllDomains();
  }, [dispatch]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const resultAction = await dispatch(
        getStats({ domainId, startDate, endDate })
      );
      if (getStats.fulfilled.match(resultAction)) {
        setStats(resultAction.payload.data);
        console.log("stats" , resultAction.payload.data);

      } else {
        setError(resultAction.error.message || "Failed to fetch stats");
      }
    } catch {
      setError("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats()
  }, [])
  
  


  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Click Statistics
      </Typography>

      {/* Filter Section */}
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
        {/* Domain Selector */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Domain</InputLabel>
          <Select
            value={domainId || ""}
            onChange={(e) => setDomainId(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Domains</MenuItem>
            {allDomains.map((domain: any) => (
              <MenuItem key={domain._id} value={domain._id}>
                {domain.domain}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date Pickers */}
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        {/* Fetch Button */}
        <Button variant="contained" onClick={fetchStats}>
          Fetch Stats
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Handling */}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stats Table */}
      {!loading && stats.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>Domain</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Today</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Last 7 Days</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Last 30 Days</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Total</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((stat: any) => (
                <TableRow key={stat.domainId}>
                  <TableCell>{stat.domainName || "N/A"}</TableCell>
                  <TableCell align="center">{stat.todayClicks}</TableCell>
                  <TableCell align="center">{stat.last7DaysClicks}</TableCell>
                  <TableCell align="center">{stat.last30DaysClicks}</TableCell>
                  <TableCell align="center">{stat.totalClicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Stats;
