// src/pages/ProductDetails.js
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  Rating,
  Button,
  Avatar,
  Stack,
  Divider,
  Container,
} from "@mui/material";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 2,
};
const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.product.products);
  console.log(id, product, "product----");

  if (!product?.id && product?.id !== id) return <NotFound />;

  return (
    <Container sx={{ py: 5 }}>
      <Box sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Slider {...settings}>
              {product.images?.map((image) => (
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={image}
                    alt={product.title}
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      maxHeight: "400px",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Grid>
          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Rating
              value={product.rating}
              readOnly
              precision={0.1}
              size="large"
              sx={{ marginBottom: 2 }}
            />
            <Typography
              variant="body2"
              color={product.stock > 0 ? "green" : "red"}
              gutterBottom
            >
              {product.availabilityStatus}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
              {product.tags.map((tag) => (
                <Chip label={tag} key={tag} variant="outlined" />
              ))}
            </Stack>
            <Button
              variant="contained"
              color="primary"
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
        {/* Additional Information */}
        <Box sx={{ marginTop: 4 }}>
          <Divider />
          <Typography variant="h5" sx={{ marginTop: 2 }} gutterBottom>
            Additional Information
          </Typography>
          <Typography variant="body2">Brand: {product.brand}</Typography>
          <Typography variant="body2">SKU: {product.sku}</Typography>
          <Typography variant="body2">Weight: {product.weight}g</Typography>
          <Typography variant="body2">
            Dimensions:{" "}
            {`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} mm`}
          </Typography>
          <Typography variant="body2">
            Warranty: {product.warrantyInformation}
          </Typography>
          <Typography variant="body2">
            Shipping: {product.shippingInformation}
          </Typography>
          <Typography variant="body2">
            Return Policy: {product.returnPolicy}
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {product.reviews.map((review, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>{review.reviewerName.charAt(0)}</Avatar>
                <Stack>
                  <Typography variant="subtitle2">
                    {review.reviewerName}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Stack>
              </Stack>
              <Typography variant="body2">{review.comment}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
              <Divider sx={{ marginTop: 1 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Product not found</Typography>
    </Box>
  );
};
