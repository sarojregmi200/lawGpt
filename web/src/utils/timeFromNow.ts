import moment from "moment";

const timeFromNow = (time: Date) => (moment.relativeTimeThreshold("ss") && moment(time).fromNow())
    .toString()
    .toLowerCase().replace("a few seconds ago", "just now")

export default timeFromNow
