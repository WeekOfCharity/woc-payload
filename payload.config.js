import { buildConfig } from "payload/config";
import Examples from "./collections/Examples";
import Users from "./collections/Users";
import Streamer from "./collections/Streamer";
import Media from "./collections/Media";
import Activities from "./collections/Activities";
import Timeslots from "./collections/Timeslots";

export default buildConfig({
    serverURL: "https://cms.weekofcharity.de",
    admin: {
        user: Users.slug,
    },
    collections: [Users, Streamer, Activities, Timeslots, Media],
    upload: {
        limits: {
            fileSize: 5_000_000, // 5MB, written in bytes
        },
    },
});
