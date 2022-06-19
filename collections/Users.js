const Users = {
    slug: "users",
    labels: {
        singular: "User",
        plural: "User",
    },
    auth: true,
    admin: {
        useAsTitle: "email",
    },
    access: {
        read: ({ req: { user } }) => {
            if (user?.role === "admin") {
                return true;
            }

            return {
                id: {
                    equals: user.id,
                },
            };
        },
        create: ({ req: { user } }) => {
            return user?.role === "admin";
        },
        update: ({ req: { user } }) => {
            if (user?.role === "admin") {
                return true;
            }

            return {
                id: {
                    equals: user.id,
                },
            };
        },
    },
    fields: [
        {
            name: "role",
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
            required: true,
            defaultValue: "user",
            access: {
                update: ({ req: { user } }) => {
                    return user?.role === "admin";
                },
            },
        },
    ],
};

export default Users;
