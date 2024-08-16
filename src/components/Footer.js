import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" textAlign={"center"}>
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Anchal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const classes = {
  footer: {
    padding: "15px",
    marginTop: "auto",
    backgroundColor: "#f5f5f5",
  },
};
const Footer = () => {
  return (
    <footer style={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1" textAlign={"center"}>
          Product Listing App
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
};

export default Footer;
