import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginDto } from "../dtos/auth/loginDto";

export const basicAuthorization = (login: LoginDto) =>
    btoa(`${login.email}:${login.password}`);

export const createThrowingAsyncThunk = <Tout, Tin>(name: string,
    fetchFunction: (arg: Tin, body?: string) => Promise<Response>,
    parseFunction: (response: Response, arg: Tin | undefined) => Promise<Tout>,
    bodyFunction?: (arg: Tin) => string) => {
    return createAsyncThunk(name, async (arg: Tin) => {
        const response = await fetchFunction(arg, bodyFunction?.(arg) ?? JSON.stringify(arg));
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await parseFunction(response, arg);
    });
}

export const createPostThunk = <Tout, Tin>(name: string, url: (arg: Tin) => string,
    parseFunction: (response: Response) => Promise<Tout>,
    bodyFunction?: (arg: Tin) => string) => {
    return createThrowingAsyncThunk(name, (arg: Tin, body?: string) => fetch(url(arg), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: body ?? JSON.stringify(arg)
    }), parseFunction, bodyFunction);
}

export const createPutThunk = <Tin>(name: string, url: (arg: Tin) => string,
    bodyFunction?: (arg: Tin) => string) => {
    return createThrowingAsyncThunk(name, (arg: Tin, body?: string) => fetch(url(arg), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: body ?? JSON.stringify(arg)
    }), async () => { }, bodyFunction);
}

export const createResponsePutThunk = <Tout, Tin>(name: string, url: (arg: Tin) => string,
    parseFunction: (response: Response) => Promise<Tout>,
    bodyFunction?: (arg: Tin) => string) => {
    return createThrowingAsyncThunk(name, (arg: Tin, body?: string) => fetch(url(arg), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: body ?? JSON.stringify(arg)
    }), parseFunction, bodyFunction);
}

export const createGetThunk = <Tout, Tin>(name: string, url: (arg: Tin) => string,
    parseFunction: (response: Response) => Promise<Tout>) => {
    return createThrowingAsyncThunk(name, (arg: Tin) => fetch(url(arg), {
        method: 'GET',
        credentials: 'include'
    }), parseFunction);
}

export const createAuthenticatedGetThunk = <Tout, Tin>(
    name: string, 
    url: (arg: Tin) => string,
    authScheme: 'Basic' | 'Bearer',
    authFunction: (arg: Tin) => string,
    parseFunction: (response: Response, arg: Tin | undefined) => Promise<Tout>) => {
    return createThrowingAsyncThunk(name, (arg: Tin) => fetch(url(arg), {
        method: 'GET',
        headers: {
            'Authorization': `${authScheme} ${authFunction(arg)}`
        }
    }), parseFunction);
}


export const createDeleteThunk = <Tin>(name: string, url: (arg: Tin) => string,
    bodyFunction?: (arg: Tin) => string) => {
    return createThrowingAsyncThunk(name, (arg: Tin, body?: string) => fetch(url(arg), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    }), async () => { }, bodyFunction);
}

export const createResponseDeleteThunk = <Tout, Tin>(name: string, url: (arg: Tin) => string,
    parseFunction: (response: Response) => Promise<Tout>,
    bodyFunction?: (arg: Tin) => string) => {
    return createThrowingAsyncThunk(name, (arg: Tin, body?: string) => fetch(url(arg), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    }), parseFunction, bodyFunction);
}
