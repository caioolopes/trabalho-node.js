
describe("PUT /users/:id", () => {
    describe("Anonymous user", () => {
  test("Should update the resource and return 204 No Content.", async () => {
  
    const initialUserData = {
      name: "User Antigo",
      email: "antigo@test.com",
    };

    const createResponse = await fetch("http://localhost:3333/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(initialUserData),
    });

    const getResponse = await fetch(`http://localhost:3333/users?search=${initialUserData.email}`);

const users = await getResponse.json();
    const createdUser = users.find(u => u.email === initialUserData.email);

    expect(createdUser).toBeDefined();
    const userId = createdUser.id;
    

    const updatedUserData = {
      name: "User Novo",
      email: "novo@test.com",
    };

    const updateResponse = await fetch(`http://localhost:3333/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUserData),
    });

    
    expect(updateResponse.status).toBe(204); 

    
    const verificationResponse = await fetch(`http://localhost:3333/users?search=${updatedUserData.email}`); 

const verifiedUsers = await verificationResponse.json();
const updatedUser = verifiedUsers.find(u => u.id === userId); 


expect(updatedUser).toBeDefined()
  });
});});
