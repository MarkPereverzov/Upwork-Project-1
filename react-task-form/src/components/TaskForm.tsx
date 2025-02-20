import { useState } from "react";
import { Button, Card, Select, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const outputOptions = ["SMS Chart", "PDF Report", "Dashboard"];
const inputOptions = ["Customer Tech Pack", "Raw Data", "User Feedback"];

interface Task {
  id: number;
  output: string;
  input: string;
}

interface TaskFormProps {
  onSubmit: (tasks: Task[]) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [taskCounter, setTaskCounter] = useState(1);
  const addTask = () => {
    setTasks([...tasks, { id: taskCounter, output: "", input: "" }]);
    setTaskCounter(taskCounter + 1);
  };

  const updateTask = (id: number, field: "output" | "input", value: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, [field]: value } : task))
    );
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const isAddDisabled = tasks.length > 0 && (!tasks[tasks.length - 1].output || !tasks[tasks.length - 1].input);
  const isDoneDisabled = tasks.length === 0 || tasks.some((task) => !task.output || !task.input);

  const handleSubmit = () => {
    setShowModal(true);
  };

  const confirmSubmit = () => {
    setShowModal(false);
    onSubmit(tasks);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card title="Tell us about yourself" style={{ width: 600, padding: "20px" }}>
        {tasks.map((task) => (
          <div key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <span>{task.id}. I create the </span>
            <Select
              value={task.output}
              onChange={(value) => updateTask(task.id, "output", value)}
              style={{ width: 120, marginRight: 5 }}
              options={outputOptions.map((opt) => ({ label: opt, value: opt }))}
            />
            <span> using the </span>
            <Select
              value={task.input}
              onChange={(value) => updateTask(task.id, "input", value)}
              style={{ width: 150, marginRight: 5 }}
              options={inputOptions.map((opt) => ({ label: opt, value: opt }))}
            />
            <Button type="text" danger icon={<CloseOutlined />} onClick={() => removeTask(task.id)} />
          </div>
        ))}

        <Button type="dashed" disabled={isAddDisabled} onClick={addTask} block>
          Add new task
        </Button>

        <Button type="primary" disabled={isDoneDisabled} onClick={handleSubmit} block style={{ marginTop: 10 }}>
          Done
        </Button>

        <Modal title="Confirm Submission" open={showModal} onOk={confirmSubmit} onCancel={() => setShowModal(false)}>
          <p>Are you sure you want to submit the tasks?</p>
        </Modal>
      </Card>
    </div>
  );
};

export default TaskForm;
