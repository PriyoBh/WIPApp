import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  selectedActivity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  selectedActivity: initialFormState,
  createActivity,
  editActivity,
  submitting,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [selectedActivity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...selectedActivity, [name]: value });
  };

  const handleSubmit = () => {
    if (selectedActivity.id.length === 0) {
      let newActivity = {
        ...selectedActivity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(selectedActivity);
    }
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={selectedActivity.title}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          onChange={handleInputChange}
          name="description"
          value={selectedActivity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={selectedActivity.category}
        />
        <Form.Input
          type="datetime-local"
          onChange={handleInputChange}
          name="date"
          placeholder="Date"
          value={selectedActivity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={selectedActivity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={selectedActivity.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
