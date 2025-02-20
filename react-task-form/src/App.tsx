import { useState } from "react";
import UserForm from "./components/UserForm";
import TaskForm from "./components/TaskForm";
import { notification } from "antd";

const App: React.FC = () => {
  const [userData, setUserData] = useState<{ id: string; jobTitle: string } | null>(null);

  const handleUserSubmit = (id: string, jobTitle: string) => {
    setUserData({ id, jobTitle });
  };

  const handleTaskSubmit = (tasks: { id: number; output: string; input: string }[]) => {
    const payload = { ...userData, tasks };
    
    fetch("https://api.example.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(() => notification.success({ message: "Tasks submitted successfully!" }))
      .catch(() => notification.error({ message: "Failed to submit tasks!" }));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {!userData ? <UserForm onNext={handleUserSubmit} /> : <TaskForm onSubmit={handleTaskSubmit} />}
    </div>
  );
};

export default App;
