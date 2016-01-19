export declare module SoundCloudAPIResponse {

    interface Success {
        duration: number;
        errors: any;
        license: string;
        sharing: string;
        streamable: boolean;
        tag_list: string;
        title: string;
        uri: string;
        user: ISoundCloudUser;
    }
    interface Error {
        message: string;
        status: number;
    }
}

interface ISoundCloudUser {
    id: number;
    uri: string;
    username: string;
}
