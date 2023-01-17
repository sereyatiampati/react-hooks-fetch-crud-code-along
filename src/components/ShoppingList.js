import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
//import { set } from "msw/lib/types/context";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then(res=>res.json())
    .then(data=> setItems(data))
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function handleAddNewItem(newObj){
    setItems([...itemsToDisplay, newObj])

  }
  function handleDeleteItem(deletedItem){
    const updatedItems = itemsToDisplay.filter(item =>item.id !== deletedItem.id)
    setItems(updatedItems);
  
  }
  function handleAddToCart(updatedItem){
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddNewItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onAddToCart={handleAddToCart} OndeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
