import { HttpMethod } from "api/FetchClient/options";
import FetchClient from "api/FetchClient";

export default class APIClient {

    // GET request
    static async get(url: string): Promise<any> {
        try {
            const options = {
                method: HttpMethod.GET,
                httpHeader: {
                    "Content-Type": "application/json",
                },
                cache: "no-store"
            }

            const request = await FetchClient.createRequest(url, options);

            return {    
                data: request.responseData(),
                isOk: request.isOk()
            };
        } catch (error) {
            console.log(error)
        }

    }

    // POST request
    static async post(url: string, body: any): Promise<any> {
        try {
            const options = {
                method: HttpMethod.POST,
                httpHeader: {
                    "Content-Type": "application/json"
                },
                body: body
            }

            const request = await FetchClient.createRequest(url, options);

            return {
                data: request.responseData(),
                isOk: request.isOk(),
                token: request.getToken()
            };
        } catch (error) {
            
            console.log(error)
        }

    }

    //PUT request
    static async put(url: string, body: any): Promise<any> {
        try {
            const options = {
                method: HttpMethod.PUT,
                httpHeader: {
                    "Content-Type": "application/json"
                },
                body: body
            }

            const request = await FetchClient.createRequest(url, options);
   
            return {
                data: request.responseData(),
                isOk: request.isOk()
            };
        } catch (error) {
            console.log(error)
        }

    }

    //DELETE request
    static async delete(url: string): Promise<any> {
        try {
            const options = {
                method: HttpMethod.DELETE
            }

            const request = await FetchClient.createRequest(url, options);

            return {
                data: request.responseData(),
                isOk: request.isOk()
            };
        } catch (error) {
            console.log(error)
        }
    }
}
