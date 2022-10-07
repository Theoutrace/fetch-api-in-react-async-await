import React from "react";
import "./AddMoviesForm.css";

const AddMoviesForm = () => {

  const movieSubmitHandler = (e) => {
    e.preventDefault()

    const NewMovieObj = {
      title: e.target[0].value,
      openingText: e.target[1].value,
      ReleaseDate: e.target[2].value
    }

    console.log(NewMovieObj);

    e.target[0].value=''
    e.target[1].value=''
    e.target[2].value=''
  }




  return (
    <form onSubmit={movieSubmitHandler} className="AddMoviesForm">
      <label className="input-title">Title</label>
      <input className="input-field"  />
      <label className="input-title">Opening Text</label>
      <textarea className="input-field-bigger"  />
      <label className="input-title">Release Date</label>
      <input className="input-field"  />
      <span>
        <button>Add Movie</button>
      </span>
    </form>
  );
};

export default AddMoviesForm;
