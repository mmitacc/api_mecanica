import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

type requestUbication = "body" | "params" | "query"

export const validatedetalles = ( Schema: ZodType, source: requestUbication = "body") => {
    return(req: Request, res: Response, next:NextFunction) => {
        const result = Schema.safeParse(req[source])
        if(!result.success){
            const issue = result.error.issues[0]
            const field = issue!.path.length > 0 ? issue?.path.join("."):source
            const message = `${field}: ${issue?.message}`
            return res.status(400).json({message})
        }
        req[source] = result.data
        next()
    }
}