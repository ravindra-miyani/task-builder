import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useFormik } from "formik";
import * as yup from "yup";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  taskName: yup
    .string("Enter your task name")
    .required("Task name is required"),
  taskDetails: yup
    .string("Enter your Task details")
    .required("Task details is required"),
});

export default function Home() {
  const [rows, setRows] = useState([
    {
      id: 1,
      taskDetails:
        "Carries out administrative duties such as filing, typing etc.",
      taskName: "Administrative Assistant Purpose",
    },
    {
      id: 2,
      taskDetails:
        "Sporting event means an athletic activity requiring skill or physical prowess",
      taskName: "Sport Events",
    },
    {
      id: 3,
      taskDetails: "Need to scrap and manage the data in cloud clusters.",
      taskName: "Data Science scrapping",
    },
    {
      id: 4,
      taskDetails:
        "The optimization must be correct, it must not, in any way, change the meaning of the program",
      taskName: "Code Optimization",
    },
    {
      id: 5,
      taskDetails:
        "Manage, monitor, maintain, secure, and service an organization's network",
      taskName: "Network Administration for AWS",
    },
    {
      id: 6,
      taskDetails:
        "Distance Education “is a process to create and provide access to learning when the source of information.",
      taskName: "Distance Education Mentorship.",
    },
    {
      id: 7,
      taskDetails:
        "Our new visa processing time guide gives you an indication of how long your visa application may take to process.",
      taskName: "E-Visa Processing Guidlines",
    },
    {
      id: 8,
      taskDetails:
        "Unsafe food containing harmful bacteria, viruses or chemical substances causes more than 200 diseases.",
      taskName: "Food Safety Roadmap",
    },
    {
      id: 9,
      taskDetails:
        "Over-irrigation, irregular sunlight can prolong ripening of crop which thus delays the harvesting time.",
      taskName: "Harvesting Crops",
    },
  ]); // Default Task list.

  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "taskName",
      headerName: "Task Name",
      width: 400,
      editable: false,
    },
    {
      field: "taskDetails",
      headerName: "Task Details",
      width: 770,
      editable: false,
    },
  ]);

  const [enableEditRemove, setEnableEditRemove] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  // Validating new and edited tasks.
  const formik = useFormik({
    initialValues: {
      taskName: taskName,
      taskDetails: taskDetails,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let tempRow = JSON.parse(JSON.stringify(rows));
      if (selectedId) {
        var searchIndex = tempRow.findIndex((x) => x.id === selectedId);

        tempRow[searchIndex] = {
          id: selectedId,
          taskName: values.taskName,
          taskDetails: values.taskDetails,
        };
        setMessage("Tasks has been updated successfully.");
      } else {
        tempRow.push({
          id: tempRow.length + 1,
          taskName: values.taskName,
          taskDetails: values.taskDetails,
        });
        setMessage("Tasks has been added successfully.");
      }
      setRows(tempRow);
      setOpenAddEdit(false);
      setOpenSnackbar(true);
    },
  });

  useEffect(() => {}, [
    rows,
    enableEditRemove,
    taskName,
    taskDetails,
    selectedId,
  ]);

  const handleAdd = () => {
    setSelectedId("");
    setTaskName("");
    setTaskDetails("");
    setOpenAddEdit(true);
  };

  const handleEdit = () => {
    setOpenAddEdit(true);
  };

  const handleRemove = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddEditClose = () => {
    setOpenAddEdit(false);
  };

  const deleteTask = () => {
    const tempRows = rows.filter((record) => record.id !== selectedId);
    setRows(tempRows);
    setMessage("Tasks has been deleted successfully.");

    handleClose();
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const onRowsSelectionHandler = (ids) => {
    if (ids.length === 1) {
      const tempRows = rows.filter((record) => record.id === ids[0]);
      setTaskName(tempRows[0].taskName);
      setTaskDetails(tempRows[0].taskDetails);
      setSelectedId(ids[0]);
      setEnableEditRemove(false);
    } else {
      setSelectedId("");
      setEnableEditRemove(true);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">
        <br></br>
        <strong>Task List</strong>
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <IconButton
            aria-label="Add new Task"
            onClick={handleAdd}
            disabled={selectedId ? true : false}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            aria-label="Edit"
            onClick={handleEdit}
            disabled={enableEditRemove}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Remove"
            onClick={handleRemove}
            disabled={enableEditRemove}
          >
            <HighlightOffIcon />
          </IconButton>
        </Stack>
      </Typography>

      {rows.length > 0 && (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        />
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want delete this record?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteTask}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAddEdit}
        onClose={handleAddEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "100%",
            maxHeight: "90%",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {selectedId ? "Edit Task" : "Add Task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack direction="row" justifyContent="flex-start" spacing={2}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="taskName"
                  name="taskName"
                  label="taskName"
                  value={formik.values.taskName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.taskName && Boolean(formik.errors.taskName)
                  }
                  helperText={formik.touched.taskName && formik.errors.taskName}
                />
                <TextField
                  fullWidth
                  id="taskDetails"
                  name="taskDetails"
                  label="taskDetails"
                  type="taskDetails"
                  value={formik.values.taskDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.taskDetails &&
                    Boolean(formik.errors.taskDetails)
                  }
                  helperText={
                    formik.touched.taskDetails && formik.errors.taskDetails
                  }
                />
                <Button type="submit">Save</Button>
                <Button onClick={handleAddEditClose} autoFocus>
                  Cancel
                </Button>
              </form>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Divider></Divider>
      <Divider></Divider>
    </Box>
  );
}
