const isAdminOrUploadedBy = ({ req: { user } }) => {
    if (user && user.role === "admin") {
        return true;
    }
    return {
        uploadedBy: {
            equals: user?.id,
        },
    };
};

const StreamerImages = {
    slug: "media",
    upload: {
        staticURL: "/media",
        staticDir: "media",
        imageSizes: [
            {
                name: "thumbnail",
                width: 512,
                // By specifying `null` or leaving a height undefined,
                // the image will be sized to a certain width,
                // but it will retain its original aspect ratio
                // and calculate a height automatically.
                height: null,
                crop: "centre",
            },
        ],
        adminThumbnail: "thumbnail",
        mimeTypes: ["image/*"],
    },
    labels: {
        singular: "Media",
        plural: "Media",
    },
    access: {
        create: () => true,
        read: () => true,
        update: () => isAdminOrUploadedBy,
        delete: () => isAdminOrUploadedBy,
    },
    fields: [
        {
            name: "type",
            type: "select",
            options: [
                { label: "Streamer Image", value: "streamer-image" },
                { label: "Activity Image", value: "activity-image" },
                { label: "Miscellaneous", value: "misc" },
            ],
            required: true,
            defaultValue: "misc",
        },
        {
            name: "uploadedBy",
            type: "relationship",
            relationTo: "users",
            access: {
                update: () => false,
            },
            admin: {
                readOnly: true,
                position: "sidebar",
                condition: (data) => Boolean(data?.uploadedBy),
            },
        },
    ],
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
                if (operation === "create") {
                    if (req.user) {
                        data.uploadedBy = req.user.id;
                        return data;
                    }
                }
            },
        ],
    },
};

export default StreamerImages;
