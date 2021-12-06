import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import Addcar from "./addcar";
import Editcar from "./editcar";

export default function Carlist() {
  const [cars, setCars] = useState([]);

  const gridRef = useRef();

  const columns = [
    {
      flex: 1,
      headerName: "Brand",
      field: "brand",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Model",
      field: "model",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Color",
      field: "color",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Fuel",
      field: "fuel",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Price",
      field: "price",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "Year",
      field: "year",
      sortable: true,
      filter: true,
    },
    {
      flex: 1,
      headerName: "",
      field: "_links",
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => {
        const url = params.value.self.href;
        return <Editcar url={url} updateCar={updateCar} />;
      },
    },
    {
      flex: 1,
      headerName: "",
      field: "_links",
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => {
        // console.log(params); // voit halutessasi katsoa, mitä funktio saa parametrina
        const url = params.value.self.href;
        // jokaiselle riville renderöidään oma onclick-funktio, joka poistaa juuri sen rivin
        return (
          <div>
            <Button color="warning" onClick={() => deleteCar(url)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const deleteCar = (url) => {
    if (window.confirm("Are you sure you want to delete the selected car?")) {
      fetch(url, { method: "DELETE" })
        .then((res) => fetchData())
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then((response) => response.json())
      .then((data) => setCars(data._embedded.cars));
  };

  const saveCar = (car) => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const updateCar = (car, url) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Addcar saveCar={saveCar} />
      <div
        className="ag-theme-material"
        style={{
          height: "700px",
          width: "80%",
          margin: "auto",
        }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={cars}
          animateRows="true"
          pagination="true"
          paginationAutoPageSize="true"
        ></AgGridReact>
      </div>
    </div>
  );
}
