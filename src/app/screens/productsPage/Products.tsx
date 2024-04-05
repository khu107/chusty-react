import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowFowardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebak", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebak", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

export default function Products() {
  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Stack className="top-title">
              <Box className="top-text">Burak Restaurant</Box>
              <Box className="single-search">
                <input
                  className="single-search-input"
                  placeholder="Type here"
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="single-button-search"
                >
                  search
                  <SearchIcon />
                </Button>
              </Box>
            </Stack>
          </Stack>
          <Stack className="dishes-filter-section">
            <Button variant="contained" color="primary" className="order">
              New
            </Button>
            <Button variant="contained" color="secondary" className="order">
              Price
            </Button>
            <Button variant="contained" color="secondary" className="order">
              Views
            </Button>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <Button variant="contained" color="primary">
                Dish
              </Button>
              <Button variant="contained" color="secondary">
                Saled
              </Button>
              <Button variant="contained" color="secondary">
                Drink
              </Button>
              <Button variant="contained" color="secondary">
                Other
              </Button>
              <Button variant="contained" color="secondary">
                Dessert
              </Button>
            </Stack>
            <Stack className="products-wapper">
              {products.length !== 0 ? (
                products.map((product, index) => {
                  return (
                    <Stack key={index} className="product-card">
                      <Stack
                        className="product-img"
                        sx={{
                          background: `url(${product.imagePath})`,
                        }}
                      >
                        <div className="prodct-sale">Normal Size</div>
                        <Button className="shop-btn">
                          <img src={"/icons/shopping-cart.svg"} alt="" />
                        </Button>
                        <Button className="view-btn">
                          <Badge badgeContent={20} color="secondary">
                            <RemoveRedEyeIcon
                              sx={{
                                color: 20 ? "white" : "gray",
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
                          {12}
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
            <Pagination count={3} page={1} color="secondary" />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Box className="brand-text">Our Family Brands</Box>
        <Stack className="brand-cards">
          <Box className="brand-card">
            <img src="/img/family1.png" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/family2.png" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/family3.png" alt="" />
          </Box>
          <Box className="brand-card">
            <img src="/img/family4.png" alt="" />
          </Box>
        </Stack>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps?q=Burak+restaurand+istanbul&amp;t&amp;z=13&amp;ie=UTF8&amp;iwloc&amp;output=embed"
              height="500px"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
