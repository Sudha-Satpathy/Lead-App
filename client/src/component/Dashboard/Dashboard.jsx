import React, { useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { styled } from '@mui/system';

const Container = styled(Box)`
  padding: 40px;
  display: flex;
`;
const Search = styled(TextField)`
    box-shadow: 2px 2px 10px grey;
`
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width:80%;
  gap: 20px;
  margin-right: 100px;
  margin-bottom: 40px;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px grey;
`;

const LeadTable = styled(TableContainer)`
  margin-top: 20px;
  box-shadow: 2px 2px 10px grey;
`;

const productOptions = ["Product A", "Product B", "Product C", "Product D"];

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [leadData, setLeadData] = useState({ email: '', name: '', number: '', product: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');

  const handleInputChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdateLead = () => {
    if (isEdit) {
      const updatedLeads = leads.map((lead, index) => (index === editIndex ? leadData : lead));
      setLeads(updatedLeads);
      setIsEdit(false);
    } else {
      setLeads([...leads, leadData]);
    }
    setLeadData({ email: '', name: '', number: '', product: '' });
  };

  const handleEdit = (index) => {
    setLeadData(leads[index]);
    setIsEdit(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedLeads = leads.filter((_, i) => i !== index);
    setLeads(updatedLeads);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    const sortedLeads = [...leads].sort((a, b) => a[field].localeCompare(b[field]));
    setLeads(sortedLeads);
    setSortField(field);
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
            <Typography variant="h4" gutterBottom>Lead Management Dashboard</Typography>
            <Container>
            <Box>
            <FormContainer>
                <TextField label="Email Id" name="email" value={leadData.email} onChange={handleInputChange} variant="outlined" fullWidth />
                <TextField label="Name" name="name" value={leadData.name} onChange={handleInputChange} variant="outlined" fullWidth />
                <TextField label="Number" name="number" value={leadData.number} onChange={handleInputChange} variant="outlined" fullWidth />
                <TextField
                select
                label="Product"
                name="product"
                value={leadData.product}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                >
                {productOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
                </TextField>
                <Button variant="contained" color="primary" onClick={handleCreateOrUpdateLead}>
                {isEdit ? 'Update Lead' : 'Create Lead'}
                </Button>
            </FormContainer>

            </Box>
            <Box>
            <Search label="Search" value={searchTerm} onChange={handleSearch} variant="outlined" fullWidth />

        <LeadTable component={Paper} >
        <Table>
            <TableHead>
            <TableRow>
                <TableCell onClick={() => handleSort('email')}>Email Id</TableCell>
                <TableCell onClick={() => handleSort('name')}>Name</TableCell>
                <TableCell onClick={() => handleSort('number')}>Number</TableCell>
                <TableCell onClick={() => handleSort('product')}>Product</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {filteredLeads.map((lead, index) => (
                <TableRow key={index}>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.number}</TableCell>
                <TableCell>{lead.product}</TableCell>
                <TableCell>
                    <IconButton onClick={() => handleEdit(index)} color="primary">
                    <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)} color="secondary">
                    <Delete />
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </LeadTable>
            </Box>
            </Container>
    </>
   
  );
};

export default Dashboard;
