export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = "";
  description: string = "";
  category: string = "";
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = "";
  venue: string = "";

  constructor(activityFormValue?: IActivityFormValues) {
    if (activityFormValue && activityFormValue.date) {
      activityFormValue.time = activityFormValue.date;
    }
    Object.assign(this, activityFormValue);
  }
}
