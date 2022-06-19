import moment from "moment";

const Timeslots = {
    slug: "timeslots",
    labels: {
        singular: "Timeslot",
        plural: "Timeslots",
    },
    fields: [
        {
            name: "startTime",
            type: "date",
            required: true,
        },
        {
            name: "duration",
            type: "number",
            required: true,
            min: 0,
        },
        {
            name: "endTime",
            type: "date",
            access: {
                update: () => false,
            },
            admin: {
                readOnly: true,
            },
        },
        {
            name: "streamer",
            type: "relationship",
            relationTo: "streamers",
            required: true,
        },
        {
            name: "fellows",
            type: "array",
            fields: [
                {
                    name: "streamer",
                    type: "relationship",
                    relationTo: "streamers",
                    required: true,
                },
            ],
        },
        {
            name: "activity",
            type: "relationship",
            relationTo: "activities",
            required: true,
        },
    ],
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
                if (operation === "create" || operation === "update") {
                    let startTime = data.startTime;
                    let duration = data.duration;

                    let date = moment(startTime).add(duration, "hours");
                    data.endTime = date.toISOString();
                }
            },
        ],
    },
};

export default Timeslots;
