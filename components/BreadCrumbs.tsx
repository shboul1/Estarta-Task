import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
export default function BreadCrumbs() {
  const breadcrumbs = [
    <Typography key="1" color="inherit">
      Home
    </Typography>,
    <Typography key="2" color="inherit">
      Administration
    </Typography>,
    <Typography key="3" color="text.primary">
      Logger Search
    </Typography>,
  ];
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2, mt: 2 }}>
      {breadcrumbs}
    </Breadcrumbs>
  );
}
