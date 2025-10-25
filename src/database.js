import fs from 'node:fs/promises';


const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8').then((data) => {
      this.#database = JSON.parse(data);
    }).catch(() => {
      this.#persist();
    });
  }

 async #persist() {
    return fs.writeFile(databasePath, JSON.stringify(this.#database)); 
  }

select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((item) => {
        return Object.entries(search).some(([key, value]) => {
          return item[key].includes(value);
        });
      });
    }

    return data;
  }

 async insert(table, data) {
   if (Array.isArray(this.#database[table])) {
     this.#database[table].push(data);
   } else {
     this.#database[table] = [data];
   }
   
   
   await this.#persist(); 
   
   return data;
  }
  
  async update(table, id, data) {
   const rowIndex = this.#database[table].findIndex(row => row.id === id)

   if (rowIndex > -1) {
     const oldRow = this.#database[table][rowIndex];
    this.#database[table][rowIndex] = { 
          id: oldRow.id, 
          name: data.name ?? oldRow.name, 
          email: data.email ?? oldRow.email,
    }
     await this.#persist()
   }
  }
  
  async delete(table, id) { // ADICIONE async
   const rowIndex = this.#database[table].findIndex(row => row.id === id)

   if (rowIndex > -1) {
     this.#database[table].splice(rowIndex, 1)
     await this.#persist() // ADICIONE await
   }
  }
  
}



