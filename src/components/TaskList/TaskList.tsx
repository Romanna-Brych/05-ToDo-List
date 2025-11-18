import type { Task, UpdateTaskData } from "../../types/task";
import css from "./TaskList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask } from "../../services/taskService";

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteTaskM } = useMutation({
    mutationFn: (id: Task["id"]) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutate: updateTaskM } = useMutation({
    mutationFn: ([id, data]: [Task["id"], UpdateTaskData]) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return (
    <ul className={css.list}>
      {tasks.map((task) => (
        <li key={task.id} className={css.item}>
          <input
            type="checkbox"
            defaultChecked={task.completed}
            className={css.checkbox}
            onChange={() =>
              updateTaskM([
                task.id,
                {
                  completed: !task.completed,
                },
              ])
            }
          />
          <span className={css.text}>{task.text}</span>
          <button
            onClick={() => deleteTaskM(task.id)}
            type="button"
            className={css.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
