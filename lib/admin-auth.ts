export function verifyAdminRequest(request: Request) {
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (!expectedToken) {
    return true;
  }

  return request.headers.get("x-admin-token") === expectedToken;
}
