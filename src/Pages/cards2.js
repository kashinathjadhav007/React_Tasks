import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Nav, Navbar, Container, NavLink } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import img1 from "../Images/logo.png";
import "../assets/css/style.css"

const columns = [
  { id: "name" },
  { id: "title" },
  {
    id: "info",
  },
  {
    id: "image",
  },
  {
    id: "date",
  },
  {
    id: "id",
  },
];

export default function Cards2() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen1 = (id) => 
  {
    let item = data[id - 1];
    setTitle(item.title);
    setDate(item.date);
    setName(item.name);
    setInfo(item.info);
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getData();
  }, []);
  function getData() {
    fetch("http://localhost:3001/users").then((result) => {
      result.json().then((response) => {
        setData(response);
      });
    });
  }
  const navigate = useNavigate();

  function redirectHandler(title, date, name, info, image) {
    navigate("/viewCard", { state: { title, date, name, info, image } });
  }

  function setUser(id) {
    let item = data[id - 1];
    setTitle(item.title);
    setDate(item.date);
    setName(item.name);
    setInfo(item.info);
    setOpen(true);
  }

  function deleteUser(id) {
    console.log(id);
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((response) => {
        getData();
        handleClose();
      });
    });
  }

  return (
    <div class="container">
    < div >
      <Navbar>
        <nav
        >
          <div>
            <img
              src={img1}
              style={{
                paddingLeft: "33px",
                paddingTop: "20px",
              }}
            ></img>
          </div>
          <div style={{paddingTop:"10px"}}>
            <input type="text"
              style={{
                padding: "10px",
                color: "black",
                width: "1000px",
                paddingTop: "20px",
              }}
              placeholder="search card"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
          </div>
          <div
            style={{
              padding: "20px 0px 0px 0px",
              marginRight: "53px",
              display: "flex",
            }}
          >
            <a style={{ textDecoration: "none", margin: "20px" }} href="cards">
              Blog
            </a>
            <a style={{ textDecoration: "none", margin: "20px" }} href="#">
              Product
            </a>
          </div>
        </nav>
      </Navbar>

      <Box style={{ display: "flex", flexWrap: "wrap", padding: "10px",borderRadius : "20px "}}>
        {data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .filter((val) => {
            if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          .map((item) => {
            const { name, id, image, title, date, info } = item;
            return (
              <Box style={{ paddingLeft: "20px",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",borderRadius : "8px "}} key={id}>
                <Card key={id} style={{}} sx={{ maxWidth: 345, padding: 1 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        K
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={handleClickOpen}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={name}
                    subheader={date}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={title}
                    onClick={() => redirectHandler(title, date, name, info)}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {info}
                    </Typography>
                  </CardContent>
                </Card>
                <Dialog open={open} onClose={handleClose}>
                  <DialogActions>
                    <Button onClick={()=>handleClickOpen1(item.id)}>Edit</Button>
                    <Button onClick={() => deleteUser(item.id)}>Delete</Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={open1} onClose={handleClose}>
                  <DialogActions>
                    <p>Title: {date}</p>
                    <br></br>
                    <div style={{bottom:"0px"}}>
                    <Button onClick={handleClose1}>Update</Button>
                    <Button onClick={handleClose1}>cancel</Button>
                    </div>
                  </DialogActions>
                </Dialog>
                <br></br>
              </Box>
            );
          })}
      </Box>
       <footer
        style={{
          background: "white",
          position: "fixed",
          bottom: "0px",
          width: "100%",
        }}
      >
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </footer>
    </div>
    </div>
  );
}
