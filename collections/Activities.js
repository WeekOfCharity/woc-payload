const Activities = {
    slug: "activities",
    labels: {
        singular: "Activity",
        plural: "Activities",
    },
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            maxLength: 128,
            required: true,
        },
        {
            name: "icon",
            type: "upload",
            relationTo: "media",
            filterOptions: {
                type: {
                    equals: "activity-image",
                },
            },
        },
        {
            name: "description",
            type: "textarea",
        },
        {
            name: "link",
            type: "text",
            maxLength: 256,
        },
    ],
};

export default Activities;
