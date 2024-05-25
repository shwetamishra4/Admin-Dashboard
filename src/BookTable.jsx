//https://openlibrary.org/subjects/science_fiction.json?limit=100

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, TablePagination, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchBook, setSearchBook] = useState('');
  const [filterBooks, setFilterBooks] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    axios.get('https://openlibrary.org/subjects/science_fiction.json?limit=100')
      .then(response => {
        const booksWithRatings = response.data.works.map(book => ({
          ...book,
          ratings_average: book.ratings_average || 'N/A',
          author_name: book.authors[0]?.name || 'Unknown',
          author_birth_date: book.authors[0]?.birth_date || 'Unknown',
          author_top_work: book.authors[0]?.top_work || 'Unknown'
        }));
        setBooks(booksWithRatings);
        setFilterBooks(booksWithRatings);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  useEffect(() => {
    const results = books.filter(book =>
      book.author_name.toLowerCase().includes(searchBook.toLowerCase())
    );
    setFilterBooks(results);
    setPage(0);
  }, [searchBook, books]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchBook(event.target.value);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setEditDialogOpen(true);
  };

  const handleEditChange = (event) => {
    setSelectedBook({
      ...selectedBook,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveEdit = () => {
    const updatedBooks = books.map(book => (book.key === selectedBook.key ? selectedBook : book));
    setBooks(updatedBooks);
    setFilterBooks(updatedBooks);
    setEditDialogOpen(false);
  };

  const sortedBooks = [...filterBooks].sort((a, b) => {
    if (orderBy === 'author_name') {
      return (order === 'asc' ? 1 : -1) * a.author_name.localeCompare(b.author_name);
    } else if (orderBy === 'ratings_average') {
      return (order === 'asc' ? 1 : -1) * (a.ratings_average - b.ratings_average);
    } else if (orderBy === 'first_publish_year') {
      return (order === 'asc' ? 1 : -1) * (a.first_publish_year - b.first_publish_year);
    } else if (orderBy === 'author_birth_date') {
      return (order === 'asc' ? 1 : -1) * new Date(a.author_birth_date) - new Date(b.author_birth_date);
    } else if (orderBy === 'author_top_work') {
      return (order === 'asc' ? 1 : -1) * a.author_top_work.localeCompare(b.author_top_work);
    } else {
      return (order === 'asc' ? 1 : -1) * a[orderBy].localeCompare(b[orderBy]);
    }
  });

  return (
    <Paper>
      <TextField
        label="Search by Author"
        value={searchBook}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button>
        <CSVLink data={sortedBooks} filename={'books.csv'}>
          Download CSV
        </CSVLink>
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {['ratings_average', 'author_name', 'title', 'first_publish_year', 'subject', 'author_birth_date', 'author_top_work'].map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={() => handleRequestSort(column)}
                  >
                    {column.replace('_', ' ')}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book) => (
              <TableRow key={book.key}>
                <TableCell>{book.ratings_average}</TableCell>
                <TableCell>{book.author_name}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.first_publish_year}</TableCell>
                <TableCell>{book.subject ? book.subject.join(', ') : ''}</TableCell>
                <TableCell>{book.author_birth_date}</TableCell>
                <TableCell>{book.author_top_work}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditClick(book)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={filterBooks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="ratings_average"
            label="Ratings Average"
            value={selectedBook?.ratings_average || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="author_name"
            label="Author Name"
            value={selectedBook?.author_name || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            value={selectedBook?.title || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="first_publish_year"
            label="First Publish Year"
            value={selectedBook?.first_publish_year || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="subject"
            label="Subject"
            value={selectedBook?.subject || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="author_birth_date"
            label="Author Birth Date"
            value={selectedBook?.author_birth_date || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="author_top_work"
            label="Author Top Work"
            value={selectedBook?.author_top_work || ''}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default BookTable;
