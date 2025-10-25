import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse";
import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const csvFilePath = path.resolve(__dirname, "../../tasks.csv");

const tasksUrl = "http://localhost:3333/tasks";


const parseConfig = {
  delimiter: ",",
  columns: true,
  skip_empty_lines: true,
};


export async function processCsv(csvPath = csvFilePath, url = tasksUrl) {
  console.log("Iniciando importação de tarefas...");

  const readStream = fs.createReadStream(csvPath);
  const parser = parse(parseConfig);

  const records = readStream.pipe(parser);
  let importedCount = 0;

  for await (const task of records) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        console.log(`[SUCESSO] Tarefa "${task.title}" importada.`);
        importedCount++;
      } else {
        const errorBody = await response.text();
        console.error(
          `[FALHA] Tarefa "${task.title}". Status: ${response.status}. Resposta: ${errorBody}`
        );
      }
    } catch (error) {
      console.error(
        `[ERRO] Falha na requisição para a tarefa "${task.title}": ${error.message}`
      );
    }
  }

  console.log(`--- Importação finalizada. Total: ${importedCount} tarefas. ---`);
}


if (import.meta.url === process.argv[1] || import.meta.url === `file://${process.argv[1]}`) {
  processCsv().catch((err) => {
    console.error("ERRO FATAL NA EXECUÇÃO:", err);
    process.exit(1);
  });
}
