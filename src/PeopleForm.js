import React, { useState } from "react";

const PeopleForm = ({ kisiler, submitFn }) => {
  const [isim, setIsim] = useState("");

  function handleIsimChange(e) {
    setIsim(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitFn(isim);
    setIsim("");
  }


  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div className="pt-4">
        <label className="text-sm" htmlFor="title">
          İsim
        </label>
        <input
          className="textBoxStyle"
          id="title"
          name="title"
          type="text"
          onChange={handleIsimChange}
          value={isim}
        />
        {kisiler.includes(isim) && <p className="input-error">Bu isim daha önce eklenmiş</p>}
      </div>

      <div className="form-line">
        <button
          className="buttonStyle"
          type="submit"
          disabled={isim.length === 0 || kisiler.includes(isim)}
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
