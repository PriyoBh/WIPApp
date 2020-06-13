import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "../Details/ActivityDetailedHeader";
import ActivityDetailedInfo from "../Details/ActivityDetailedInfo";
import ActivityDetailedChat from "../Details/ActivityDetailedChat";
import ActivityDetailedSidebar from "../Details/ActivityDetailedSidebar";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
    
  }, [loadActivity, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;

  if (!selectedActivity) {
    return <h2>Activity Not Found</h2>;
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader selectedActivity={selectedActivity} />
        <ActivityDetailedInfo selectedActivity={selectedActivity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
