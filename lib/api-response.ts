import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api";

export function ok<T>(data: T, message?: string) {
  return NextResponse.json<ApiResponse<T>>({
    success: true,
    data,
    message
  });
}

export function fail(error: string, status = 400) {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      data: null,
      error
    },
    { status }
  );
}
