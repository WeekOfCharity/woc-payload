const Streamer = {
    slug: "streamers",
    labels: {
        singular: "Streamer",
        plural: "Streamers",
    },
    admin: {
        useAsTitle: "handle",
    },
    access: {
        create: ({ req: { user } }) => {
            return user?.role === "admin";
        },
        read: () => true,
        update: ({ req: { user } }) => {
            if (user?.role === "admin") {
                return true;
            }

            return {
                owner: {
                    equals: user.id,
                },
            };
        },
        delete: ({ req: { user } }) => {
            if (user?.role === "admin") {
                return true;
            }

            return {
                owner: {
                    equals: user.id,
                },
            };
        },
    },
    fields: [
        {
            name: "handle",
            type: "text",
            maxLength: 26,
            required: true,
        },
        {
            name: "name",
            type: "text",
            maxLength: 26,
        },
        {
            name: "owner",
            type: "relationship",
            relationTo: "users",
            required: true,
        },
        {
            name: "picture",
            type: "upload",
            relationTo: "media",
            filterOptions: {
                type: {
                    equals: "streamer-image",
                },
            },
        },
        {
            name: "pronouns",
            type: "text",
            maxLength: 26,
        },
        {
            name: "twitter",
            type: "text",
            maxLength: 26,
        },
        {
            name: "twitch",
            type: "text",
            maxLength: 26,
        },
        {
            name: "introduction",
            type: "textarea",
        },
    ],
};

export default Streamer;
