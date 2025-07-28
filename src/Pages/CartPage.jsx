import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../assets/Redux/cartSlice";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import NavBar from "../assets/components/NavBar";
import { getImageSrc } from "../static/DefaultExports";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + 499 * item.quantity, 0);
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
    toast.info(`${item.title} removed from cart`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
      toast.info("Cart cleared", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...", {
      position: "top-center",
      autoClose: 2000,
    });
    // Add your checkout logic here
  };

  if (cartItems.length === 0) {
    return (
      <>
        <NavBar />
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Button variant="contained" onClick={() => navigate("/explore")}>
            Continue Shopping
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow mb-4 flex items-center gap-4"
              >
                <img
                  src={getImageSrc(item.coverImageURL)}
                  alt={item.title}
                  className="w-24 h-32 object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.authors?.join(", ")}</p>
                  <p className="text-lg font-semibold mt-2">₹499</p>
                </div>

                <div className="flex items-center gap-2">
                  <IconButton
                    size="small"
                    onClick={() => dispatch(decreaseQuantity(item))}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <span className="px-3 py-1 bg-gray-100 rounded">
                    {item.quantity}
                  </span>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(increaseQuantity(item))}
                  >
                    <AddIcon />
                  </IconButton>
                </div>

                <IconButton
                  color="error"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}

            <Button
              variant="outlined"
              color="error"
              onClick={handleClearCart}
              className="mt-4"
            >
              Clear Cart
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  items)
                </span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹50</span>
              </div>
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{calculateTotal() + 50}</span>
                </div>
              </div>
            </div>

            <Button variant="contained" fullWidth onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
