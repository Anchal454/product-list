import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Avatar,
  Grid,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Container } from "@mui/system";
import SearchComponent from "../components/Search";
import { NotFound } from "./ProductDetails";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    setPage(1);
    setCategoryFilter("");
  };
  const fetchUserDetails = async () => {
    const searchQuery = searchValue ? `/search?q=${searchValue}` : "";
    const categoryQuery = categoryFilter ? `/category/${categoryFilter}` : "";
    console.log(categoryFilter, "categoryFilter");
    const pagination =
      searchQuery || categoryQuery ? "" : `?limit=12&skip=${(page - 1) * 12}`;
    const response = await fetch(
      `https://dummyjson.com/products${categoryQuery}${searchQuery}${pagination}`
    );
    const responseData = await response.json();
    return responseData;
  };

  const fetchCategoryList = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/category-list`
    );
    const responseData = await response.json();
    return responseData;
  };
  const { data: categoryList } = useQuery({
    queryKey: ["CategoryListing"],
    queryFn: fetchCategoryList,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["ProductListing", searchValue, page, categoryFilter],
    queryFn: fetchUserDetails,
  });

  const handleChange = (event) => {
    setCategoryFilter(event.target.value);
    setPage(1);
    setSearchValue("");
  };

  return (
    <>
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" fontWeight={600} sx={{ pb: 5 }}>
          Product Listing
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <SearchComponent
              searchValue={searchValue}
              handleSearch={handleSearch}
            />
          </Box>

          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <Select
              sx={{ textTransform: "capitalize" }}
              size="small"
              value={categoryFilter}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>All Category</em>
              </MenuItem>
              {(categoryList || []).map((category) => (
                <MenuItem
                  value={category}
                  key={category}
                  sx={{ textTransform: "capitalize" }}
                >
                  {category}
                </MenuItem>
              ))}
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
          </FormControl>
        </Box>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              height: "80vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              height: "80vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="error">Error: {error.message}</Typography>
          </Box>
        ) : data?.products?.length < 1 ? (
          <NotFound />
        ) : (
          <>
            <Grid
              container
              rowSpacing={2}
              sx={{ my: 4 }}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {data?.products?.map((product) => (
                <Grid item xs={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            <Pagination
              sx={{ ul: { justifyContent: "center" }, pb: 5 }}
              count={Math.ceil(data.total / data?.limit) || 0}
              variant="outlined"
              page={page}
              onChange={(event, value) => setPage(value)}
              color="secondary"
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
