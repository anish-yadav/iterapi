import Axios from "axios";
import {
    ATTENDANCE_URL,
    LOGIN_URL,
    REGID_URL,
    RESULTDETAIL_URL,
    STUDENTINFO_URL,
    STUDENTPHOTO_URL,
    STUDENTRESULT_URL,
} from "./constatnts";
import { ATTENDANCE, DETAIL_RESULT, MYDETAIL, RESULT } from "./types";

export class Student {
    private name: string;
    private username: string;
    private password: string;
    private cookies: any;
    private registrationId: string;
    private memberType = "S";
    private api = Axios.create({ withCredentials: true });

    constructor(regno: string, password: string) {
        this.username = regno;
        this.password = password;
    }

    async init(): Promise<{ student?: Student; error?: string }> {
        const loginRepsonse = await this.login({
            username: this.username,
            password: this.password,
            MemberType: this.memberType,
        });
        if (!loginRepsonse.cookies) return { error: loginRepsonse.error };
        this.cookies = loginRepsonse.cookies;

        const regidResponse = await this.getRegistrationId();
        if (!regidResponse)
            return { error: "Error in fetching registration id" };
        this.registrationId = regidResponse;

        return { student: this };
    }

    private async login(payload: {
        username: string;
        password: string;
        MemberType: string;
    }): Promise<{ cookies?: string[]; error?: string }> {
        const response = await this.api({
            method: "POST",
            url: LOGIN_URL,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            if (response.data.message.toLowerCase().includes("successful")) {
                this.name = response.data.name;
                return { cookies: response.headers["set-cookie"] };
            } else {
                return {
                    error: response.data.message,
                };
            }
        }
        return { error: "Unable to login" };
    }

    private async getRegistrationId(): Promise<string | undefined> {
        let regId;
        try {
            const response = await this.api({
                method: "POST",
                url: REGID_URL,
                data: {},
                headers: {
                    Cookie: this.cookies[0],
                },
            });
            regId = response.data.studentdata[0].REGISTRATIONID;
        } catch (e) {
            // some error occured
        }
        return regId;
    }

    async myInfo(): Promise<MYDETAIL | undefined> {
        if (!this.cookies && !this.name) return undefined;

        const response = await this.api({
            method: "POST",
            data: {},
            url: STUDENTINFO_URL,
            headers: {
                Cookie: this.cookies,
                "Content-Type": "application/json",
            },
        });

        return response.data ? (response.data as MYDETAIL) : undefined;
    }

    async getImage(): Promise<string | undefined> {
        if (!this.cookies) return undefined;

        const response = await this.api({
            method: "GET",
            url: STUDENTPHOTO_URL,
            headers: {
                Cookie: this.cookies,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }

    async getAttendance(): Promise<{
        attendance?: ATTENDANCE[];
        error?: string;
    }> {
        if (!this.cookies) return { error: "Initialization error" };
        const response = await this.api({
            method: "POST",
            url: ATTENDANCE_URL,
            data: { registerationid: this.registrationId },
            headers: {
                Cookie: this.cookies,
                "Content-Type": "application/json",
            },
        });
        if (response && response.data) {
            return { attendance: response.data.griddata as ATTENDANCE[] };
        }
        return { error: "Unknown error" };
    }

    async getResult(): Promise<RESULT[] | undefined> {
        const response = await this.api({
            method: "POST",
            url: STUDENTRESULT_URL,
            headers: {
                Cookie: this.cookies,
                "Content-Type": "application/json",
            },
        });
        if (response && response.data && response.data.data)
            return response.data.data as RESULT[];

        return undefined;
    }

    async getDetailResult(sem: number): Promise<DETAIL_RESULT[] | undefined> {
        const response = await this.api({
            method: "POST",
            data: { styno: sem + "" },
            url: RESULTDETAIL_URL,
            headers: {
                Cookie: this.cookies,
                "Content-Type": "application/json",
            },
        });

        if (response.data && response.data.Semdata)
            return response.data.Semdata as DETAIL_RESULT[];

        return undefined;
    }
}
