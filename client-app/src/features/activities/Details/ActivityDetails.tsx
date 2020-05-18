import React from "react";
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  selectedActivity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({
  selectedActivity,
  setEditMode,
  setSelectedActivity,
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity?.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity?.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            content="Edit"
            color="blue"
          />
          <Button
            onClick={() => setSelectedActivity(null)}
            basic
            content="Cancel"
            color="grey"
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
