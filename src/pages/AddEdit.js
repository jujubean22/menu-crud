import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  price: null,
  cost: null,
  inventory: null,
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, price, cost, inventory } = state;

  const history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("costs").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !cost || !inventory) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child("costs").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Menu Item has been Added Successfully");
          }
        });
      } else {
        fireDb.child(`costs/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("cost Updated Successfully");
          }
        });
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Menu Item"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={price || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="cost">Cost</label>
        <input
          type="number"
          id="cost"
          name="cost"
          placeholder="Cost"
          value={cost || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="name">Inventory</label>
        <input
          type="text"
          id="inventory"
          name="inventory"
          placeholder="Inventory"
          value={inventory || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
