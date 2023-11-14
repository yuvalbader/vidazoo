// DataSummary.js

import React from "react";
import { Typography, Grid } from "@mui/material";

const DataSummary = ({
  domain,
  advertiserCount,
  adsCount,
  fromCache,
  parseTime,
}) => (
  <Typography
    variant="subtitle1"
    gutterBottom
    align="center"
    style={{
      background: "rgba(239, 246, 255)",
      borderRadius: 8,
      padding: 16,
      border: "1px solid rgba(59, 130, 246, 0.5)",
      marginBottom: 20,
    }}
  >
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        Domain:<strong> {domain}</strong>
      </Grid>
      <Grid item>
        Total Advertisers:<strong> {advertiserCount}</strong>
      </Grid>
      <Grid item>
        Total Ads:<strong> {adsCount}</strong>
      </Grid>
      <Grid item>
        Parse Time:
        <strong>
          {fromCache ? "From Cache" : parseTime && `${parseTime}ms`}
        </strong>
      </Grid>
      <Grid item>
        Parse Errors:<strong> {0}</strong>
      </Grid>
    </Grid>
  </Typography>
);

export default DataSummary;
