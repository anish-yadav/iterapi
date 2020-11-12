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
import {makeRequest} from "./helpers/request";
import {ATTENDANCE, DETAIL_RESULT, MYDETAIL, RESULT} from "./types";

export class Student {
  private name: string;
  private username: string;
  private password: string;
  private cookies: any;
  private registrationId: string;
  private memberType = "S";
  private api = Axios.create({withCredentials: true});

  constructor(regno: string, password: string) {
    this.username = regno;
    this.password = password;
  }

  async init(): Promise<{student?: Student; error?: string}> {
    const loginRepsonse = await this.login({
      username: this.username,
      password: this.password,
      MemberType: this.memberType,
    });
    if (!loginRepsonse.cookies) return {error: loginRepsonse.error};
    this.cookies = loginRepsonse.cookies;

    const regidResponse = await this.getRegistrationId();
    if (!regidResponse)
      return {error: "Error in fetching registration id"};
    this.registrationId = regidResponse;

    return {student: this};
  }

  private async login(payload: {
    username: string;
    password: string;
    MemberType: string;
  }): Promise<{cookies?: string[]; error?: string}> {
    try {
      const response = await this.api({
        method: "POST",
        url: LOGIN_URL,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        if (
          response.data.message.toLowerCase().includes("successful")
        ) {
          this.name = response.data.name;
          return {cookies: response.headers["set-cookie"]};
        } else {
          return {
            error: response.data.message,
          };
        }
      }
    } catch (e) {
      throw e;
    }
    return {error: "Unable to login"};
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
      throw e;
    }
    return regId;
  }

  async myInfo(): Promise<{myinfo?: MYDETAIL; error?: string}> {
    if (!this.cookies && !this.name)
      return {error: "Initilization error"};

    try {
      const response = await this.api({
        method: "POST",
        data: {},
        url: STUDENTINFO_URL,
        headers: {
          Cookie: this.cookies,
          "Content-Type": "application/json",
        },
      });
      if (response.data)
        return {myinfo: response.data as MYDETAIL};
    } catch (e) {
      return {error: "Unknown error"};
    }
    return {error: "Unknown error"};
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
    if (!this.cookies) return {error: "Initialization error"};
    try {
      const response = await this.api({
        method: "POST",
        url: ATTENDANCE_URL,
        data: {registerationid: this.registrationId},
        headers: {
          Cookie: this.cookies,
          "Content-Type": "application/json",
        },
      });
      if (response && response.data) {
        return {attendance: response.data.griddata as ATTENDANCE[]};
      }
    } catch (e) {
      throw e;
    }
    return {error: "Unknown error"};
  }

  async getResult(): Promise<{result?: RESULT[]; error?: string}> {
    if (!this.cookies) return {error: "Failed to initilize"};
    try {
      const response = await this.api({
        method: "POST",
        url: STUDENTRESULT_URL,
        headers: {
          Cookie: this.cookies,
          "Content-Type": "application/json",
        },
      });
      if (response && response.data && response.data.data)
        return {result: response.data.data as RESULT[]};
    } catch (e) {
      throw e;
    }
    return {error: "Unknown error"};
  }

  async getDetailResult(
    sem: number
  ): Promise<{result?: DETAIL_RESULT[]; error?: string}> {
    try {
      const response = await this.api({
        method: "POST",
        data: {styno: sem + ""},
        url: RESULTDETAIL_URL,
        headers: {
          Cookie: this.cookies,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.Semdata)
        return {result: response.data.Semdata as DETAIL_RESULT[]};
    } catch (e) {
      throw e;
    }
    return {error: "Unknown error"};
  }
}
