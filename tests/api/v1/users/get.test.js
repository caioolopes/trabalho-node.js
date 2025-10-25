describe("GET /api/v1/users/[username]", () => {
describe("Anonymous user", () => {
 test("Should return 200 OK and a list of resources", async () => {

 const response = await fetch(
 "http://localhost:3333/users",
);

expect(response.status).toBe(200);
 });
 });
});