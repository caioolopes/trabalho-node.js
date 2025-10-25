import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
import { describe, test, expect, beforeAll, beforeEach, afterEach, afterAll, jest } from "@jest/globals";
import { processCsv } from "../../../../src/utils/import-csv.js";


class MockDatabase {
  constructor() {
    this.tasks = [];
  }

  insert(table, item) {
    if (table === "tasks") this.tasks.push(item);
  }

  select(table) {
    if (table === "tasks") return this.tasks;
    return [];
  }

  clear(table) {
    if (table === "tasks") this.tasks = [];
  }
}

const database = new MockDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testCsvPath = path.resolve(__dirname, "data", "test-import.csv");

describe("CSV Import Script Logic", () => {
  beforeAll(() => {
    global.fetch = jest.fn(async (url, options) => {
      const task = JSON.parse(options.body);
      database.insert("tasks", task);
      return { ok: true, status: 200, text: async () => "OK" };
    });
  });

  afterAll(() => {
    global.fetch.mockRestore?.();
  });

  beforeEach(async () => {
    const csvContent =
      "title,description\nTarefa CSV A,Descricao do item A\nTarefa CSV B,Descricao do item B";

    await fs.mkdir(path.dirname(testCsvPath), { recursive: true });
    await fs.writeFile(testCsvPath, csvContent, "utf-8");
  });

  afterEach(async () => {
    await fs.unlink(testCsvPath).catch(() => {});
    database.clear("tasks");
  });

  test("Deve processar o CSV e inserir novos dados no banco", async () => {
    const initialTasks = database.select("tasks");
    const initialCount = initialTasks.length;

    await processCsv(testCsvPath);

    const finalTasks = database.select("tasks");
    expect(finalTasks.length).toBe(initialCount + 2);

    expect(finalTasks).toContainEqual(
      expect.objectContaining({ title: "Tarefa CSV A", description: "Descricao do item A" })
    );

    expect(finalTasks).toContainEqual(
      expect.objectContaining({ title: "Tarefa CSV B", description: "Descricao do item B" })
    );
  });
});
