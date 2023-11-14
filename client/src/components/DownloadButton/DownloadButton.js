import React, { useRef, useState, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const DownloadButton = ({
  downloadFormat,
  setDownloadFormat,
  downloadMenuTrigger,
  handleClickDownloadMenu,
  handleCloseDownloadMenu,
  handleDownload,
}) => {
  const [menuWidth, setMenuWidth] = useState(null);
  const buttonRef = useRef(null);
  const open = Boolean(downloadMenuTrigger);

  useEffect(() => {
    if (buttonRef.current) {
      setMenuWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  return (
    <>
      <Button
        ref={buttonRef}
        aria-controls="download-menu"
        aria-haspopup="true"
        onClick={handleClickDownloadMenu}
        variant="contained"
        color="primary"
      >
        Download Selected ({downloadFormat})
      </Button>
      <Menu
        id="download-menu"
        anchorEl={downloadMenuTrigger}
        keepMounted
        open={open}
        onClose={handleCloseDownloadMenu}
        PaperProps={{
          style: {
            width: menuWidth,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            setDownloadFormat("JSON");
            handleDownload();
          }}
        >
          JSON
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDownloadFormat("CSV");
            handleDownload();}}
        >
          CSV
        </MenuItem>
      </Menu>
    </>
  );
};

export default DownloadButton;
