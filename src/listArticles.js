const ListArticles = ({ i, edit, index, value, handleEdit, handleDelete }) => {
  return (
    <article className={edit && index === i ? "edit" : undefined}>
      <h4>{value}</h4>
      <div className="buttons">
        <button id="edit" onClick={() => handleEdit(value, i)}>
          <i className="fas fa-edit"></i>
        </button>
        <button id="delete" onClick={() => handleDelete(value, i)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </article>
  );
};

export default ListArticles;
