import { useState } from "react";
import { Input, Button, Card } from "antd";

interface UserFormProps {
  onNext: (id: string, jobTitle: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onNext }) => {
  const [userId, setUserId] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const isNextDisabled = !userId || !jobTitle;

  return (
    <div>
<Card title="Tell us about yourself" style={{ width: 400, textAlign: "center" }}>

        <img src="https://via.placeholder.com/150"
          alt="Logo"
          style={{
            width: "100%",
            height: "auto",
            marginBottom: 20,
          }}
        />
        <Input
          placeholder="Enter your ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Enter your job title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" disabled={isNextDisabled} onClick={() => onNext(userId, jobTitle)} block>
          Next
        </Button>
      </Card>
    </div>
  );
};

export default UserForm;
