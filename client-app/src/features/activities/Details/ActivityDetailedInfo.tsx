import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";

const ActivityDetailedInfo: React.FC<{
  selectedActivity: IActivity;
}> = ({ selectedActivity }) => {
  return (
    <div>
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{selectedActivity.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {format(selectedActivity.date, "eeee do MMMM")} at{" "}
                {format(selectedActivity.date, "h:mm a")}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>
                {selectedActivity.venue}, {selectedActivity.city}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default ActivityDetailedInfo;
