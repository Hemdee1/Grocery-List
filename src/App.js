import { useEffect, useState } from "react";
import ListArticles from "./listArticles";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [list, setList] = useState(getLocalStorage());
  const [value, setValue] = useState("");
  const [index, setIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [notif, setNotif] = useState(null);
  const [state, setState] = useState("success");

  useEffect(() => {
    setTimeout(() => {
      setNotif(null);
    }, 1000);
  }, [notif]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value) {
      if (edit) {
        setList(
          list.map((li, i) => {
            if (i === index) {
              li = value;
            }
            return li;
          })
        );
        setEdit(false);
        setNotif("item updated");
        setState("success");
        setValue("");
        // localStorage.setItem("list", JSON.stringify(list));
        return;
      }

      setList([...list, value]);
      setValue("");
      setNotif("item added to the list");
      setState("success");
    } else {
      setNotif("please enter a value");
      setState("danger");
    }
  };

  const handleEdit = (value, index) => {
    setEdit(true);
    setValue(value);
    setIndex(index);
  };

  const handleDelete = (value, i) => {
    let newli = list.filter((li, index) => !(index === i && value === li));
    // let newli = list.splice(i, 0);
    setList(newli);
    setNotif("item deleted");
    setState("danger");
  };

  const handleClear = () => {
    setList([]);
    setNotif("items cleared");
    setState("danger");
    setValue("");
    setEdit(false);
    localStorage.removeItem("list");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="container">
      {/* notification */}
      {notif && <p className={`alert ${state}`}>{notif}</p>}

      {/* form */}
      <form onSubmit={handleSubmit}>
        <h1 className="title">Grocery List</h1>
        <input
          type="text"
          placeholder="e.g eggs"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input type="submit" value={edit ? "Update" : "Submit"} />
      </form>

      {/* list items */}
      <div className="grocery-list">
        {list &&
          list.map((value, i) => {
            return (
              <ListArticles
                key={i}
                i={i}
                edit={edit}
                index={index}
                value={value}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })}
      </div>

      {/* clear button */}
      {list.length > 0 && (
        <p id="clear" onClick={handleClear}>
          Clear items
        </p>
      )}
    </section>
  );
};

export default App;
