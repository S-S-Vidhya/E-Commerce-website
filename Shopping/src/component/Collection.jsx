import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Rating,
  Chip,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Pagination,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Favorite, FilterList } from "@mui/icons-material";
import { CartContext } from "./CardContext";
import { WishlistContext } from "./WishlistContext";
import { useLocation } from "react-router-dom";
import Contact from './Contact';


const Collection = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState("");
  const [discountFilter, setDiscountFilter] = useState([0, 100]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [materialFilter, setMaterialFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const allMaterials = [...new Set(products.map(product => product.material))].filter(Boolean);

  const filteredProducts = products
    .filter((product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (searchQuery === "" || product.name.toLowerCase().includes(searchQuery))
    )
    .filter(product =>
      product.Discount >= discountFilter[0] && product.Discount <= discountFilter[1]
    )
    .filter(product =>
      parseFloat(product.ratings) >= ratingFilter
    )
    .filter(product =>
      materialFilter.length === 0 || materialFilter.includes(product.material)
    )
    .sort((a, b) => {
      if (priceFilter === "low") return a.price - b.price;
      if (priceFilter === "high") return b.price - a.price;
      return 0;
    });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleWishlistToggle = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const getDiscountedPrice = (price, discount) => {
    return (price - (price * discount / 100)).toFixed(2);
  };

  const handleMaterialChange = (material) => {
    setMaterialFilter(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);


  return (
    <>
      <Box display="flex" p={{ xs: 1, sm: 3 }} mt={{ xs: 8, sm: 10, lg: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={3}>
            <Box
              p={{ xs: 1, sm: 2 }}
              borderRight={{ sm: "1px solid #ddd", xs: "none" }}
              sx={{
                width: { xs: "100%", sm: "150px", md: '200px', lg: '250px' },
                maxWidth: { sm: "300px" },
                position: { sm: "sticky", xs: "static" },
                top: { sm: "80px", xs: 0 },
                backgroundColor: "#fff",
                height: { sm: "calc(100vh - 80px)", xs: "auto" },
                overflowY: "auto",
                mb: { xs: 2, sm: 0 }
              }}
            >

              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#D81B60",
                    fontFamily: 'serif',
                    fontWeight: 'bold',
                    fontSize: { xs: "16px", sm: "14px", md: "22px" }
                  }}
                >
                  Filters
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FilterList />}
                  sx={{
                    borderColor: "#D81B60",
                    color: "#D81B60",
                    fontSize: { xs: "12px", sm: "12px" },
                    padding: { xs: "8px 12px", sm: "6px 12px" },
                    minWidth: { xs: "100px", sm: "auto" },
                    "&:hover": {
                      backgroundColor: "#D81B60",
                      color: "#fff"
                    }
                  }}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Hide" : "Filters"}
                </Button>
              </Box>

              <Box mb={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'serif' }}>Categories</Typography>
                <List sx={{ ml: { xs: '-10px' } }}>
                  {["All", "Bangles", "Earrings", "Bracelets", "Rings", "Necklaces", "Pendants", "Anklets"].map((category) => (
                    <ListItem
                      button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      sx={{
                        backgroundColor: selectedCategory === category ? '#F8E1E7' : 'transparent',
                        borderRadius: 1,
                        py: 0.5,
                        my: 1.5
                      }}
                    >
                      <ListItemText
                        primary={category}
                        sx={{
                          fontWeight: selectedCategory === category ? "bold" : "normal",
                          color: selectedCategory === category ? "#D81B60" : "inherit",
                          fontSize: { xs: "14px", sm: "16px" }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {showFilters && (
                <>

                  <Box mb={3}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Price</Typography>
                    <Select
                      fullWidth
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      sx={{ mt: 1 }}
                      size={isMobile ? "small" : "medium"}
                    >
                      <MenuItem value='all'>All</MenuItem>
                      <MenuItem value="low">Low to High</MenuItem>
                      <MenuItem value="high">High to Low</MenuItem>
                    </Select>
                  </Box>


                  <Box mb={3}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Discount Range: {discountFilter[0]}% - {discountFilter[1]}%
                    </Typography>
                    <Slider
                      value={discountFilter}
                      onChange={(e, newValue) => setDiscountFilter(newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      sx={{ color: '#D81B60' }}
                    />
                  </Box>


                  <Box mb={3}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Minimum Rating: {ratingFilter}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Rating
                        value={ratingFilter}
                        onChange={(e, newValue) => setRatingFilter(newValue)}
                        precision={0.5}
                        sx={{ mr: 2 }}
                        size={isMobile ? "small" : "medium"}
                      />
                      <Typography>{ratingFilter}+</Typography>
                    </Box>
                  </Box>

                  <Box mb={3}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Material</Typography>
                    <FormGroup>
                      {allMaterials.map((material) => (
                        <FormControlLabel
                          key={material}
                          control={
                            <Checkbox
                              checked={materialFilter.includes(material)}
                              onChange={() => handleMaterialChange(material)}
                              sx={{ color: '#D81B60', '&.Mui-checked': { color: '#D81B60' } }}
                              size={isMobile ? "small" : "medium"}
                            />
                          }
                          label={<Typography fontSize={{ xs: "14px", sm: "16px" }}>{material}</Typography>}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                </>
              )}
            </Box>
          </Grid>


          <Grid item xs={12} sm={9} md={9}>
            <Typography variant="h5" mb={2} sx={{ color: '#D81B60', fontSize: { xs: "20px", sm: "24px" } }}>
              {selectedCategory}
            </Typography>
            <Grid container spacing={{ xs: 1, sm: 3 }}>
              {filteredProducts.length > 0 ? (
                currentItems.map((product) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={product.id} mb={3}>
                    <Box
                      border="1px solid #ddd"
                      borderRadius={2}
                      p={{ xs: 1, sm: 2 }}
                      textAlign="center"
                      sx={{
                        transition: "0.3s",
                        "&:hover": { boxShadow: 3, transform: "scale(1.02)" },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box position="relative" sx={{ flexGrow: 1 }}>
                        {/* Discount Badge */}
                        {product.Discount > 0 && (
                          <Chip
                            label={`${product.Discount}% OFF`}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 10,
                              left: 10,
                              fontWeight: 'bold',
                              backgroundColor: '#D81B60',
                              color: 'white'
                            }}
                          />
                        )}

                        {/* New Badge */}
                        {product.new === "true" && (
                          <Chip
                            label="NEW"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              backgroundColor: '#1976d2',
                              color: 'white',
                              zIndex: 1
                            }}
                          />
                        )}

                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: isMobile ? "150px" : "200px",
                            objectFit: "cover",
                            borderRadius: "8px"
                          }}
                        />
                        <IconButton
                          onClick={() => handleWishlistToggle(product)}
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            backgroundColor: "rgba(255,255,255,0.7)",
                            padding: { xs: "4px", sm: "8px" }
                          }}
                          size={isMobile ? "small" : "medium"}
                        >
                          <Favorite
                            fontSize={isMobile ? "small" : "medium"}
                            color={wishlist.some((item) => item.id === product.id) ? "error" : "inherit"}
                          />
                        </IconButton>
                      </Box>

                      <Typography
                        fontWeight="bold"
                        sx={{
                          minHeight: '50px',
                          fontSize: { xs: "14px", sm: "16px" }
                        }}
                      >
                        {product.name}
                      </Typography>

                      {/* Material */}
                      <Typography variant="caption" color="text.secondary" mb={1} mt={-2} fontSize={{ xs: "12px", sm: "14px" }}>
                        {product.material}
                      </Typography>

                      {/* Rating */}
                      <Box >
                        <Rating
                          name={`rating-${product.id}`}
                          value={parseFloat(product.ratings) || 0}
                          precision={0.5}
                          readOnly
                          size={isMobile ? "small" : "medium"}
                        />
                      </Box>

                      {/* Price Section */}
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                        minHeight: '30px'
                      }}>
                        {product.Discount > 0 ? (
                          <>
                            <Typography
                              variant="body1"
                              sx={{
                                color: 'text.secondary',
                                textDecoration: 'line-through',
                                fontSize: { xs: "14px", sm: "16px" }
                              }}
                            >
                              ${product.price}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: '#D81B60',
                                fontWeight: 'bold',
                                fontSize: { xs: "14px", sm: "16px" }
                              }}
                            >
                              ${getDiscountedPrice(product.price, product.Discount)}
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'text.secondary',
                              fontSize: { xs: "14px", sm: "16px" }
                            }}
                          >
                            ${product.price}
                          </Typography>
                        )}
                      </Box>

                      {/* Add to Cart Button */}
                      <Box mt={{ xs: 1, sm: 2 }}>
                        <Button
                          variant="contained"
                          onClick={() => addToCart(product)}
                          fullWidth
                          size={isMobile ? "small" : "medium"}
                          sx={{
                            backgroundColor: '#D81B60',
                            fontSize: { xs: "12px", sm: "14px" },
                            padding: { xs: "6px 12px", sm: "8px 16px" },
                            '&:hover': {
                              backgroundColor: '#C2185B'
                            }
                          }}
                        >
                          ADD TO CART
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      mt: 5,
                      px: 2
                    }}
                  >
                    No products found matching your filters
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>


      </Box>
      <Pagination
        count={Math.ceil(filteredProducts.length / itemsPerPage)}
        page={currentPage}
        onChange={(e, value) => setCurrentPage(value)}
        sx={{
          display: 'flex', justifyContent: 'center', mt: 10,
          '& .MuiPaginationItem-root': {
            border: '1px solid #ff',
            color: '#D81B60',
            '&.Mui-selected': {
              backgroundColor: '#D81B60',
              color: '#fff',
              border: '1px solid #D81B60',
            },
            '&:hover': {
              backgroundColor: '#fff',
              color: '#D81B60'
            }
          }
        }}
      />
      <Contact />
    </>
  );
};

export default Collection;


