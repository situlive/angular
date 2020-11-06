export class Attempt<T> {
    success: boolean;
    failure: boolean;
    error: any;
    result: T;
    message: string;
}
