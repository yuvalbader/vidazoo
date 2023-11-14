import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import ProgressBar from "../ProgressBar/ProgressBar";
import LinearProgress from "@mui/material/LinearProgress";

const AdvertisersTable = ({ advertisers, handleSelect, adsCount, loading }) => {
  const handleCellClick = (params, event) => {
    const field = params.field;
    if (field === "domain") {
      const domain = params.row.domain;
      window.open(`http://${domain}`, "_blank");
      // Prevent row selection on domain click
      event.stopPropagation();
    }
  };

  const columns = [
    {
      field: "domain",
      headerName: "Domain",
      sortable: true,
      width: 100,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={(event) => handleCellClick(params, event)}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "count",
      headerName: "Count",
      type: "number",
      sortable: true,
      width: 200,
    },
    {
      field: "pagePresence",
      headerName: "Page Presence",
      width: 500,
      type: "number",
      width: 200,
      renderCell: (params) => <ProgressBar value={params.row.pagePresence} />,
    },
  ];

  const rowsData = advertisers.map((row) => ({
    id: row.domain,
    domain: row.domain,
    count: row.count,
    pagePresence: row.count / adsCount,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        loading={loading}
        rows={rowsData}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={handleSelect}
        components={{
          Toolbar: GridToolbar,
          ToolbarContainer: GridToolbarContainer,
          ToolbarExport: GridToolbarExport,
          loadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
};

export default AdvertisersTable;
