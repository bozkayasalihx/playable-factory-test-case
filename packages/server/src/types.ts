import { Request, Response } from "express";

type Interval = string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined;

type NewQS<Q> = qs.ParsedQs & Record<keyof Q, Interval>;

export type TypedResponse<
    T extends { message: string; data?: Record<string, any> } = {
        message: string;
        data?: Record<string, any>;
    }
> = Response<T>;

export type TypedRequest<
    T extends Record<string, any> = {},
    Q extends NewQS<Q> = NewQS<Record<string, never>>
> = Request<any, any, T, Q>;
