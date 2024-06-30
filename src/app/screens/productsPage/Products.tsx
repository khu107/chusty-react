import { Box, Button, Container, Stack, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowFowardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquery } from "../../../lib/types/product";
import { ChangeEvent, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import Events from "../homPage/Events";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const [age, setAge] = useState("createdAt");

  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquery>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: SelectChangeEvent) => {
    productSearch.page = 1;
    productSearch.order = order.target.value;
    setAge(order.target.value);
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Stack className="top-title">
              <Box className="top-text">Chustiy Restaurant</Box>
              <Box className="single-search">
                <input
                  className="single-search-input"
                  placeholder="Type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="single-button-search"
                  onClick={searchProductHandler}
                >
                  search
                  <SearchIcon />
                </Button>
              </Box>
            </Stack>
          </Stack>
          <Stack className="dishes-filter-section">
            <Box className="product-category">
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DISH
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DISH)}
              >
                Dish
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.SALAD
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
              >
                Salad
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DRINK
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
              >
                Drink
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                Other
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DESERT
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.DESERT)
                }
              >
                Dessert
              </Button>
            </Box>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>Sort</span>
                <Select
                  value={age}
                  onChange={searchOrderHandler}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {/* <MenuItem value=""></MenuItem> */}
                  <MenuItem value={"createdAt"}>New</MenuItem>
                  <MenuItem value={"productPrice"}>Price</MenuItem>
                  <MenuItem value={"productViews"}>Views</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="products-wapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " litre"
                      : product.productSize + " size";
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{
                          background: `url(${imagePath})`,
                        }}
                      >
                        <div className="prodct-sale">{sizeVolume}</div>
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img src={"/icons/shopping-cart.svg"} alt="" />
                        </Button>
                        <Button className="view-btn">
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOnIcon color="secondary" />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Product are not aviable!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item: any) => (
                <PaginationItem
                  slot={{
                    previous: ArrowBackIcon,
                    next: ArrowFowardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Box className="brand-text">Meet Our Team</Box>
        <Stack className="brand-cards">
          <Box className="brand-card">
            <img src="/img/chef1.jpg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/chef2.jpeg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/chef3.jpeg" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/chef4.jpeg" alt="" />
          </Box>
        </Stack>
      </div>
      <Container>
        <Typography
          sx={{ marginTop: "30px", fontSize: "20px", fontWeight: "600" }}
        >
          Recomended based on your search
        </Typography>
        <Stack className="list-category-section" sx={{ marginBottom: "20px" }}>
          <Stack className="products-wapper">
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? product.productVolume + " litre"
                    : product.productSize + " size";
                return (
                  <Stack
                    key={product._id}
                    className="product-card"
                    onClick={() => chooseDishHandler(product._id)}
                  >
                    <Stack
                      className="product-img"
                      sx={{
                        background: `url(${imagePath})`,
                      }}
                    >
                      <div className="prodct-sale">{sizeVolume}</div>
                      <Button
                        className="shop-btn"
                        onClick={(e) => {
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });
                          e.stopPropagation();
                        }}
                      >
                        <img src={"/icons/shopping-cart.svg"} alt="" />
                      </Button>
                      <Button className="view-btn">
                        <Badge
                          badgeContent={product.productViews}
                          color="secondary"
                        >
                          <RemoveRedEyeIcon
                            sx={{
                              color:
                                product.productViews === 0 ? "gray" : "white",
                            }}
                          />
                        </Badge>
                      </Button>
                    </Stack>
                    <Box className="product-desc">
                      <span className="product-title">
                        {product.productName}
                      </span>
                      <div className="product-desc">
                        <MonetizationOnIcon color="secondary" />
                        {product.productPrice}
                      </div>
                    </Box>
                  </Stack>
                );
              })
            ) : (
              <Box className="no-data">Product are not aviable!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
