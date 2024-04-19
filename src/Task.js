import { formatDistanceToNow, differenceInDays } from "date-fns";
import React from "react";

const Task = ({ taskObj, onComplete }) => {

  let now = new Date();
  let deadlineDate = new Date(taskObj.deadline);
  let remainingDays = differenceInDays(deadlineDate, now);
  let formatOptions = {addSuffix: true}
  let formatRemaining = formatDistanceToNow(deadlineDate, formatOptions);

  let deadlineClass = remainingDays < 3 ? "bg-deadline-red" : "bg-purple-300";
  
  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <div className="deadline">son teslim: <span className={deadlineClass}>{formatRemaining}</span></div>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>{p}</span>
        ))}
      </div>
      {onComplete && <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>}
    </div>
  );
};

export default Task;
