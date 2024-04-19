import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  function mySubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    toast.success(data.title + " başarıyla eklendi");
    reset({
      title: "",
      description: "",
      deadline: "",
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
      <div className="ptStlye">
        <label className="headerStyle" htmlFor="title">
          Başlık
        </label>
        <input
          className="textBoxStyle"
          {...register("title", { required: "Task başlığı yazmalısınız" })}
          id="title"
          name="title"
          type="text"
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="ptStyle">
        <label className="descriptionStlye" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="textBoxStyle"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter içermelidir",
            },
          })}
          rows="3"
          id="description"
          name="description"
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div className="ptStlye">
        <label className="text-sm block pb-6">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label
              className="text-base px-4 py-2 rounded-md border border-gray-300 mr-2 mb-2 inline-flex items-center cursor-pointer"
              key={p}
            >
              <input className="mr-2"
                {...register("people", {
                  required: "Lütfen en az 1 kişi seçin",
                  validate: {
                    maxKisi: (value) =>
                      value.length < 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
                type="checkbox"
                name="people"
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p>
        )}
      </div>

      <div className="pt-4">
        <label className="descriptionStlye" htmlFor="deadline">
          Son teslim
        </label>
        <input
          className="textBoxStyle"
          {...register("deadline", {
            required: "Son teslim tarihi seçmelisiniz",
          })}
          id="deadline"
          name="deadline"
          type="date"
          min="2023-01-25"
        />
        {errors.deadline && (
          <p className="input-error">{errors.deadline.message}</p>
        )}
      </div>

      <div className="pt-4">
      <button class="buttonStyle">
          Kaydet
        </button>
      </div>
    </form>
  );
}
