import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import moment from "moment";
export default function ProcessOrders() {
  return (
    <TabPanel value="2">
      <Stack>
        {[1, 2].map((ele, index) => {
          return (
            <Box key={index} className="order-main-box">
              <Box className="order-box-scroll">
                {[1, 2, 3].map((ele2, index2) => {
                  return (
                    <Box key={index2} className="orders-name-price">
                      <div
                        style={{
                          display: "flex",
                          gap: 20,
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="/img/lavash.webp"
                          className="order-dish-img"
                          alt=""
                          style={{ width: 50, height: 50, borderRadius: "50%" }}
                        />
                        <p className="title-dish">Lavash</p>
                      </div>
                      <Box className="price-box">
                        <p>$9</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>2</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p>$24</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>$18</p>
                  <img src="/icons/plus.svg" alt="" />
                  <p>Delivery cost</p>
                  <p>$2</p>
                  <img
                    src="/icons/pause.svg"
                    alt=""
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>$20</p>
                </Box>
                <p className="data-compl">
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button variant="contained" className="verify-button">
                  VERIFY TO FULFIL
                </Button>
              </Box>
            </Box>
          );
        })}

        {false && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src="/icons/noimage-list.svg"
              alt=""
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
