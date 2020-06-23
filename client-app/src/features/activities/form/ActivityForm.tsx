import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import {
  ActivityFormValues,
  IActivityFormValues,
} from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const { submitting, loadActivity } = activityStore;
  const [selectedActivity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  /*
  const handleSubmit = () => {
    if (selectedActivity.id.length === 0) {
      let newActivity = {
        ...selectedActivity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(selectedActivity).then(() => {
        history.push(`/activities/${selectedActivity.id}`);
      });
    }
  };
*/
  const handleSubmitFinalForm = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    console.log(activity);
  };
  /*
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...selectedActivity, [name]: value });
  };
*/
  const handleCancel = () => {
    history.push("/activities");
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={selectedActivity}
            onSubmit={handleSubmitFinalForm}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={selectedActivity.title}
                  component={TextInput}
                />
                <Field
                  placeholder="Description"
                  name="description"
                  rows={3}
                  value={selectedActivity.description}
                  component={TextAreaInput}
                />
                <Field
                  component={SelectInput}
                  options={category}
                  name="category"
                  placeholder="Category"
                  value={selectedActivity.category}
                />
                <Form.Group widths={"equal"}>
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={selectedActivity.date}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={selectedActivity.time}
                  />
                </Form.Group>

                <Field
                  component={TextInput}
                  name="city"
                  placeholder="City"
                  value={selectedActivity.city}
                />
                <Field
                  component={TextInput}
                  name="venue"
                  placeholder="Venue"
                  value={selectedActivity.venue}
                />
                <Button
                  disabled={loading}
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  disabled={loading}
                  onClick={handleCancel}
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
