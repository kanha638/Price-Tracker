import React, { useState } from "react";
import Catg from "./Catg";
import ShopCart from "./ShopCart";
import "./style.css";

import { useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { Categories } from "./../../common/data";
import InputLabel from "@mui/material/InputLabel";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const names = ["HealthCare", "Sports", "Personal Hygene", "Sex", "Clothes"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Shop = ({ productItems, title }) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [product, setProduct] = useState(productItems);
  const [flag, setFlag] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setFlag(true);
    setSearchText(e.target.value);
    const val = e.target.value;
    const result = productItems.filter((element) => {
      return (
        String(element.product_title)
          .toLowerCase()
          .includes(String(val).toLowerCase()) ||
        String(element?.current_price)
          .toLowerCase()
          .includes(String(val).toLowerCase())
      );
    });
    setProduct(result);
  };

  return (
    <>
      <section className="shop background">
        <div className="container d_flex ">
          <Catg />

          <div className="contentWidth">
            <div
              className="heading d_flex headingmyproduct"
              sx={{ alignContent: "space-between" }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="heading-left screenviewtitle">{title}</div>
                <div style={{ background: "white" }}>
                  <input
                    placeholder="Search something"
                    style={{ padding: "10px", width: "220px" }}
                    value={searchText}
                    onChange={handleChange}
                  />
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ background: "white" }}
                  ></i>
                </div>
              </div>
              <div className="heading-right mobileviewCategory">
                <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                  <InputLabel id="demo-simple-select-helper-label">
                    Category
                  </InputLabel>
                  <Select
                    className="ab"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    placeholder="Categories"
                    sx={{
                      display: "flex",
                      minWidth: 250,
                      maxHeight: "45px",
                      borderRadius: "5px",
                      borderColor: "black",
                      backgroundColor: "white",
                      "@media screen and (max-width: 514px)": {
                        minWidth: 110,
                      },
                    }}
                    input={<OutlinedInput label="Category" />}
                    MenuProps={MenuProps}
                  >
                    {Categories.map((value) => (
                      <MenuItem
                        key={value.name}
                        value={value.value}
                        style={getStyles(value.name, personName, theme)}
                      >
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="product-content  grid1">
              <ShopCart productItems={flag === true ? product : productItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
