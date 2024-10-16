import { useState } from "react";

const TodoApp = () => {
  const itemId = new Date().getTime().toString();
  const [curName, setCurName] = useState();
  const [todoItems, setTodoItems] = useState([]);
  const [isEditedItem, setIsEditedItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const addItem = (itemName) => {
    if (!curName) {
      return alert("Enter your Todo Here..");
    } else if (curName && toggleBtn) {
      setCurName("");
      setIsEditedItem(null);
      setToggleBtn(false);
      return setTodoItems(
        todoItems.map((curElem) => {
          if (curElem.id === isEditedItem) {
            return { ...curElem, name: curName };
          }
          return curElem;
        })
      );
    }

    const newTodoItems = [...todoItems, { name: itemName, id: itemId }];
    setTodoItems(newTodoItems);
    setCurName("");
  };
  const handlenameChange = (event) => {
    setCurName(event.target.value);
  };
  //Delete an Item
  const deleteItem = (itemId) => {
    const newTodoAfDel = todoItems.filter((curElem) => curElem.id !== itemId);
    setTodoItems(newTodoAfDel);
  };
  //Edit an Item
  const editItem = (itemId) => {
    const editedItem = todoItems.find((curElem) => curElem.id === itemId);

    setCurName(editedItem.name);
    setIsEditedItem(itemId);
    setToggleBtn(true);
  };
  return (
    <div>
      <h2 className="text-center">To do App</h2>
      <div className="AddItem row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Enter Todo here.."
            value={curName}
            onChange={handlenameChange}
          />
        </div>
        <div className="col-4">
          {toggleBtn ? (
            <button onClick={() => addItem(curName)}>Save</button>
          ) : (
            <button onClick={() => addItem(curName)}>Add</button>
          )}
        </div>
      </div>
      {todoItems.map((curElem) => {
        return (
          <div className="displayItem row " key={curElem.id}>
            <div className="col-6">
              <span>{curElem.name}</span>
            </div>
            <div className="col-4">
              <button onClick={() => editItem(curElem.id)}>Edit</button>
              <button onClick={() => deleteItem(curElem.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoApp;
