import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const Mantenimiento = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    codigo: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    codigoUsuario: ''
  });

  const fetchAlumnos = async () => {
    // Aquí deberías hacer una llamada a tu API para obtener la lista de alumnos
    // const response = await fetch('/api/alumnos');
    // const data = await response.json();
    // setAlumnos(data);
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleAddAlumno = () => {
    setSelectedAlumno(null);
    setForm({
      codigo: '',
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      codigoUsuario: ''
    });
    setDialogOpen(true);
  };

  const handleEditAlumno = (alumno) => {
    setSelectedAlumno(alumno);
    setForm({
      codigo: alumno.codigo,
      nombres: alumno.nombres,
      apellidoPaterno: alumno.apellido_paterno,
      apellidoMaterno: alumno.apellido_materno,
      codigoUsuario: alumno.codigo_usuario
    });
    setDialogOpen(true);
  };

  const handleDeleteAlumno = (codigo) => {
    // Aquí deberías hacer una llamada a tu API para eliminar al alumno
    // await fetch(`/api/alumnos/${codigo}`, { method: 'DELETE' });
    fetchAlumnos();
  };

  const handleFormSubmit = async () => {
    if (selectedAlumno) {
      // Aquí deberías hacer una llamada a tu API para actualizar al alumno
      // await fetch(`/api/alumnos/${form.codigo}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(form),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    } else {
      // Aquí deberías hacer una llamada a tu API para crear un nuevo alumno
      // await fetch('/api/alumnos', {
      //   method: 'POST',
      //   body: JSON.stringify(form),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    }
    setDialogOpen(false);
    fetchAlumnos();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Mantenimiento de Alumnos
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={handleAddAlumno}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar Alumno" />
          </ListItem>
        </List>
      </Drawer>
      <Container style={{ marginTop: '2rem' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddAlumno}>
          Agregar Alumno
        </Button>
        <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellido Paterno</TableCell>
                <TableCell>Apellido Materno</TableCell>
                <TableCell>Código Usuario</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumnos.map((alumno) => (
                <TableRow key={alumno.codigo}>
                  <TableCell>{alumno.codigo}</TableCell>
                  <TableCell>{alumno.nombres}</TableCell>
                  <TableCell>{alumno.apellido_paterno}</TableCell>
                  <TableCell>{alumno.apellido_materno}</TableCell>
                  <TableCell>{alumno.codigo_usuario}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditAlumno(alumno)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteAlumno(alumno.codigo)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{selectedAlumno ? 'Editar Alumno' : 'Agregar Alumno'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedAlumno ? 'Actualiza la información del alumno.' : 'Ingresa la información del nuevo alumno.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="codigo"
            label="Código"
            type="number"
            fullWidth
            value={form.codigo}
            onChange={handleInputChange}
            disabled={!!selectedAlumno}
          />
          <TextField
            margin="dense"
            name="nombres"
            label="Nombres"
            type="text"
            fullWidth
            value={form.nombres}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="apellidoPaterno"
            label="Apellido Paterno"
            type="text"
            fullWidth
            value={form.apellidoPaterno}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="apellidoMaterno"
            label="Apellido Materno"
            type="text"
            fullWidth
            value={form.apellidoMaterno}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="codigoUsuario"
            label="Código Usuario"
            type="number"
            fullWidth
            value={form.codigoUsuario}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            {selectedAlumno ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Mantenimiento;
