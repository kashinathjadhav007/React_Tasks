import { useState, useEffect } from "react";
import faker from "@faker-js/faker";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import TablePagination from "@mui/material/TablePagination";
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
];

export default function Cards() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <>
      <TextField
        style={{ padding: "10px" }}
        placeholder="search card"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></TextField>
      <Box style={{ display: "flex", flexWrap: "wrap", padding: "10px" }}>
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
              <Box style={{ paddingLeft: "20px" }}>
                <Card
                  key={id}
                  style={{ padding: "5" }}
                  sx={{ maxWidth: 345, padding: 2 }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        K
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
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
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {info}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
      </Box>
      <TablePagination
        rowsPerPageOptions={[8]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
