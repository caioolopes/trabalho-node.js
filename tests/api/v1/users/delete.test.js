
describe("DELETE /users/:id", () => {
  test("Should return 204 No Content and remove the resource from the database.", async () => {
  
    const initialUserData = {
      name: "User para Deletar",
      email: "deletar-agora@test.com",
    };


    await fetch("http://localhost:3333/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(initialUserData),
    });

    const getResponse = await fetch(`http://localhost:3333/users?search=${initialUserData.email}`);
    const users = await getResponse.json();
    
    const userToDelete = users.find(u => u.email === initialUserData.email);
    
   
    expect(userToDelete).toBeDefined(); 
    const userId = userToDelete.id;
   
    const deleteResponse = await fetch(`http://localhost:3333/users/${userId}`, {
      method: "DELETE", 
    });

    
    expect(deleteResponse.status).toBe(204); 
   
    const verificationResponse = await fetch(`http://localhost:3333/users?search=${initialUserData.email}`);
    const verifiedUsers = await verificationResponse.json();
    
  
    const stillExists = verifiedUsers.some(u => u.id === userId);

   
    expect(stillExists).toBe(false); 
  });
});