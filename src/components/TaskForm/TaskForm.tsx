import { createTask } from "../../services/taskService";
import type { CreateTaskData } from "../../types/task";
import css from "./TaskForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface TaskFormProps {
  onSucces: () => void;
}

function TaskForm({ onSucces }: TaskFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateTaskData) => createTask(data),
  });

  const handleSubmit = (formData: FormData) => {
    mutate(
      {
        text: formData.get("text") as string,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          onSucces();
        },
        onError: (error) => console.log(error),
      }
    );
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.label}>
        Task text
        <textarea name="text" className={css.input} rows={5}></textarea>
      </label>

      <button type="submit" className={css.button} disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}

export default TaskForm;
