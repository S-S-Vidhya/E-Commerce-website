import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Box, Typography, Button, Paper, Grid, Avatar, Divider, Chip,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { Delete, ShoppingBag, CalendarToday, Payment, LocalShipping } from "@mui/icons-material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setOpenDeleteDialog(true);
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(`http://localhost:5000/orders/${selectedOrder.id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box p={4} sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Typography 
        variant="h5" 
        mt={3} 
        gutterBottom 
        sx={{ 
          color: "#D81B60",
          textAlign: "center",
          fontFamily: 'serif',
          fontWeight: 'bold',
          mb: 4
        }}
      >
        <ShoppingBag sx={{ verticalAlign: 'middle', mr: 2 }} />
        Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Box textAlign="center" py={3}>
          <Typography variant="h6" color="text.secondary">
            You haven't placed any orders yet
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              mt: 3,
              backgroundColor: "#D81B60",
              '&:hover': { backgroundColor: "#C2185B" }
            }}
            href="/collection"
          >
            Start Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3,
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Order #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <CalendarToday sx={{ fontSize: 14, verticalAlign: 'middle', mr: 1 }} />
                      {new Date(order.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Chip 
                    label={`₹${order.total}`} 
                    color="primary" 
                    sx={{ 
                      backgroundColor: "#D81B60",
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }} 
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Customer Details
                    </Typography>
                    <Typography>Name: {order.customer?.name || order.name}</Typography>
                    <Typography>Email: {order.customer?.email || order.email}</Typography>
                    <Typography>Phone: {order.customer?.phone || order.phone}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Shipping Info
                    </Typography>
                    <Typography>
                      <LocalShipping sx={{ verticalAlign: 'middle', mr: 1, fontSize: 18 }} />
                      {order.customer?.address || order.address}
                    </Typography>
                    <Typography>
                      {order.customer?.city || order.city}, {order.customer?.zip || order.zip}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <Payment sx={{ verticalAlign: 'middle', mr: 1, fontSize: 18 }} />
                      Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                        order.paymentMethod?.toUpperCase() || 'UPI'}
                    </Typography>
                  </Grid>
                </Grid>

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
                  Ordered Items
                </Typography>
                <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {order.items?.map((item) => (
                    <Box 
                      key={item.id} 
                      display="flex" 
                      alignItems="center" 
                      sx={{ mb: 2, p: 1, backgroundColor: '#f9f9f9', borderRadius: 1 }}
                    >
                      <Avatar 
                        src={item.image} 
                        alt={item.name} 
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                      <Box flexGrow={1}>
                        <Typography fontWeight="medium">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.quantity} × ₹{item.price}
                        </Typography>
                      </Box>
                      <Typography fontWeight="bold">₹{(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box textAlign="right" mt={3}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteClick(order)}
                    sx={{ 
                      textTransform: 'none',
                      '&:hover': { backgroundColor: '#ffebee' }
                    }}
                  >
                    Cancel Order
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel Order #{selectedOrder?.id}?
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>No, Keep It</Button>
          <Button 
            onClick={deleteOrder} 
            color="error"
            variant="contained"
          >
            Yes, Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;