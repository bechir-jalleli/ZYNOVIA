/**
 * httpError.ts
 *
 * Lightweight typed HTTP error helper for Next.js API route handlers.
 * Keeps route files clean by centralising status-code → NextResponse mapping.
 */

import { NextResponse } from 'next/server';

export type HttpErrorCode =
    | 'BAD_REQUEST'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'CONFLICT'
    | 'PAYLOAD_TOO_LARGE'
    | 'UNPROCESSABLE'
    | 'INTERNAL_ERROR';

const STATUS_MAP: Record<HttpErrorCode, number> = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    PAYLOAD_TOO_LARGE: 413,
    UNPROCESSABLE: 422,
    INTERNAL_ERROR: 500,
};

export class HttpError extends Error {
    public readonly statusCode: number;

    constructor(
        public readonly code: HttpErrorCode,
        message: string
    ) {
        super(message);
        this.name = 'HttpError';
        this.statusCode = STATUS_MAP[code];
    }
}

/** Convert any caught error into a structured NextResponse JSON. */
export function toErrorResponse(error: unknown): NextResponse {
    if (error instanceof HttpError) {
        return NextResponse.json(
            { error: error.code, message: error.message },
            { status: error.statusCode }
        );
    }

    const message =
        error instanceof Error ? error.message : 'An unexpected error occurred';

    console.error('[API] Unhandled error:', error);
    return NextResponse.json(
        { error: 'INTERNAL_ERROR', message },
        { status: 500 }
    );
}
