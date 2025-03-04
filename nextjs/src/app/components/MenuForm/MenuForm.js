// src/app/components/MenuForm/MenuForm.js
"use client";
import { useState, useEffect } from "react";
import AddMenuForm from "./AddMenuForm";
import EditMenuForm from "./EditMenuForm";
import MenuList from "./MenuList";

function MenuForm() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);


   const fetchMenuItems = async () => {
        setLoading(true);
        setError(null)
        try {
            const response = await fetch("http://localhost:8080/menu")

            if (!response.ok) {
                throw new Error("Failed to fetch menu")
            }
            const data = await response.json();
            setMenuItems(data)

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

  useEffect(() => {
    fetchMenuItems();
  }, []);


    const handleMenuAdded = () => {
        fetchMenuItems() // Re-fetch after adding
    }

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleMenuUpdated = () => {
    fetchMenuItems(); // Re-fetch after updating
    setEditingItem(null)
  };

  const handleDelete = async (name) => {
    if (!confirm("Are you sure you want to delete this item?")) {
        return
    }

    try {
        const response = await fetch(`http://localhost:8080/menu/name/${name}`,{
            method: 'DELETE'
        })
        if(!response.ok){
            throw new Error("Failed to fetch menu")
        }
        fetchMenuItems() //Re-Fetch
    } catch (error) {
        setError(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <AddMenuForm onMenuAdded={handleMenuAdded} />

      {editingItem && (
        <EditMenuForm
          item={editingItem}
          onMenuUpdated={handleMenuUpdated}
          onCancel={handleCancelEdit}
        />
      )}

      <MenuList menuItems={menuItems} onEdit={handleEdit} onDelete={handleDelete}  />
    </div>
  );
}

export default MenuForm;