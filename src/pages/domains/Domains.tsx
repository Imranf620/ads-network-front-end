import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllDomains } from "../../features/domainsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  TablePagination,
  Paper,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import CreateDomainModel from "../../components/createDomainModel/CreateDomainModel";

const Domains = () => {
  const [allDomains, setAllDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof any>("domain");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showCreateDomainModel, setShowCreateDomainModel] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAllDomains = async () => {
      setLoading(true);
      setError(null);
      try {
        const resultAction = await dispatch(getAllDomains());
        if (getAllDomains.fulfilled.match(resultAction)) {
          setAllDomains(resultAction.payload.data);
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

  const handleRequestSort = (property: keyof any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterType(event.target.value);
  };

  const filteredDomains = allDomains.filter((domain) => {
    return (
      domain.domain.toLowerCase().includes(search.toLowerCase()) &&
      (filterType ? domain.type === filterType : true)
    );
  });

  const sortedDomains = filteredDomains.sort((a, b) => {
    if (orderBy === "domain") {
      return order === "asc"
        ? a.domain.localeCompare(b.domain)
        : b.domain.localeCompare(a.domain);
    }
    return 0;
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedDomains.length - page * rowsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Domains</h1>
      <div className="mb-6 flex flex-wrap gap-2 justify-between items-center">
        <TextField
          label="Search Domains"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
          value={search}
          className="max-w-lg"
        />
        <FormControl variant="outlined"  className="max-w-xs ml-4 w-44">
          <InputLabel>Filter by Type</InputLabel>
          <Select value={filterType} onChange={handleFilterChange} label="Filter by Type">
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="button">Button</MenuItem>
            <MenuItem value="redirect">Redirect</MenuItem>
            <MenuItem value="template">Template</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button onClick={() => setShowCreateDomainModel(true)}>Create Domain</Button>
      <TableContainer component={Paper} className="shadow-lg rounded-lg">
        <Table sx={{ minWidth: 650 }} aria-label="domains table">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "domain" ? order : false}>
                <TableSortLabel
                  active={orderBy === "domain"}
                  direction={orderBy === "domain" ? order : "asc"}
                  onClick={() => handleRequestSort("domain")}
                >
                  Domain
                  {orderBy === "domain" ? (
                    <span style={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDomains
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((domain) => (
                <TableRow hover key={domain._id} className="hover:bg-gray-100">
                  <TableCell>{domain.domain}</TableCell>
                  <TableCell>{domain.type}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedDomains.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="mt-4"
      />
      {showCreateDomainModel && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <CreateDomainModel setShowCreateDomainModel={setShowCreateDomainModel} />
        </div>
      )}
    </div>
  );
};

export default Domains;
