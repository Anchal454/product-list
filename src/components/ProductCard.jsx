import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Box, Chip, Rating } from "@mui/material";

import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("product add");

    dispatch(addProduct(product));
  };

  return (
    <Link
      to={`/${product.id}`}
      style={{ textDecoration: "none" }}
      onClick={() => handleAddToCart(product)}
    >
      <Card sx={{ border: 1, borderColor: "#E0E0E0" }}>
        <CardMedia
          component="img"
          sx={{ height: "100%" }}
          image={product.thumbnail}
          title="green iguana"
        />
        <CardContent sx={{ px: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Box>
              <Typography
                variant="body2"
                color={product.stock > 0 ? "green" : "red"}
                gutterBottom
              >
                {product.availabilityStatus}
              </Typography>
            </Box>
            <Box>
              <Rating
                size="small"
                value={product.rating}
                readOnly
                precision={0.1}
                sx={{ marginBottom: 2 }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                {product.minimumOrderQuantity &&
                  `Min Quantity : ${product.minimumOrderQuantity}`}
              </Typography>
            </Box>
            <Box>
              <Chip
                label={product.category}
                sx={{ textTransform: "capitalize" }}
                color="warning"
                size="small"
              />
            </Box>
          </Box>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 40,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 3 }}>
          <Link to={`/${product.id}`}>
            <Button variant="contained" size="small" color="secondary">
              Show More
            </Button>
          </Link>
          <Link to={`/${product.id}`}>
            <Button variant="outlined" color="secondary" size="small">
              Buy Now
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Link>
  );
}
