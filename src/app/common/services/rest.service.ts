import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RestService {
    constructor(private http: HttpClient) {}

    exec(url, method, data?, options?, retryCount?: number): Observable<any> {
      let observable: Observable<any> = this.http[method.toLowerCase()](url, (data ? data : (options ? options : undefined)), options);
      let onSuccess = (res: Response)=> {
        return res;
      }
      let onError = (err: any): Observable<String> => {
        let errObj;
        try {
            errObj = typeof err?.error == "object" ? err?.error : JSON.parse(err?.error);
        } catch(err) {}
        finally {
            const statusMessages: Record<number, string> = {
                401: "User Unauthenticated",
                403: "User Unauthorized",
                404: "Caught 404 - URL not Found !!",
                502: "Request Timed Out"
            };         
            const status: number = err?.status;
            const message: string = statusMessages[status] || "UNKNOWN ERROR";
            const updatedErrObj = { ...errObj, message, status };
            return throwError(()=> updatedErrObj);
        }
      }
      return observable.pipe(map(onSuccess), catchError(onError));
    }
}