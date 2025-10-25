describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
   
    test("Should create a new resource and return status 201 Created.", async () => {
        const userData = {
            name: "vitoria",
            email: "vitoria@test.com",
        };

       
        const postResponse = await fetch("http://localhost:3333/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        expect(postResponse.status).toBe(201);

       
        const getResponse = await fetch("http://localhost:3333/users");
        const users = await getResponse.json();

        
        const createdUser = users.find(u => u.email === userData.email);
        
        expect(createdUser).toBeDefined();
        expect(createdUser.name).toBe(userData.name);
        expect(createdUser).toHaveProperty('id'); // Verifica se o ID foi gerado
    });
});});