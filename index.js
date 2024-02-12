#!/usr/bin/env node

import 'dotenv/config';
import { default as Knex } from 'knex';

const DB_TABLE = process.env.DB_TABLE;

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

const getAllTasks = async () => await knex(DB_TABLE);

// const getTaskByTask = async taskName =>
//   await knex(DB_TABLE).where('task', 'ilike', `%${taskName}%`);

const getTaskByID = async id => {
  try {
    const task = await knex(DB_TABLE).where('id', '=', id);
    console.log(`${task[0].id}. ${task[0].status} ${task[0].task}`);
  } catch (error) {
    console.log('error: ', error);
  }
};

const addNewTask = async taskName => {
  // eslint-disable-next-line no-useless-catch
  try {
    const ids = await knex(DB_TABLE)
      .returning('id')
      .insert({ task: taskName, status: '[В работе]' });
    return ids[0].id;
  } catch (error) {
    throw error;
  }
};

const listTasks = async () => {
  console.log('Список задач:');
  (await getAllTasks()).forEach(task => {
    console.log(`${task.id}. ${task.status} ${task.task}`);
  });
};

const updateTask = async (updateID, newTaskName) => {
  try {
    await knex(DB_TABLE).where({ id: updateID }).update({ task: newTaskName });
    console.log(`Задача с ID ${updateID} обновлена`);
  } catch (error) {
    console.log('error: ', error);
  }
};

const updateStatus = async (statusID, newStatus) => {
  try {
    await knex(DB_TABLE)
      .where({ id: statusID })
      .update({ status: `[${newStatus}]` });
    console.log(`Статус задачи с ID ${statusID} обновлен`);
  } catch (error) {
    console.log('error: ', error);
  }
};

const deleteTask = async id => {
  try {
    await knex(DB_TABLE).where({ id }).del();
    console.log(`Задача с ID ${id} удалена`);
  } catch (error) {
    console.log('error: ', error);
  }
};

const init = async () => {
  const command = process.argv[2];

  switch (command) {
    case 'add':
      const taskName = process.argv[3];
      const newID = await addNewTask(taskName);
      console.log(`Задача добавлена с идентификатором ${newID}`);
      break;
    case 'list':
      await listTasks();
      break;
    case 'get':
      const id = process.argv[3];
      await getTaskByID(id);
      break;
    case 'update':
      const updateID = process.argv[3];
      const newTaskName = process.argv[4];
      await updateTask(updateID, newTaskName);
      break;
    case 'status':
      const statusID = process.argv[3];
      const newStatus = process.argv[4];
      await updateStatus(statusID, newStatus);
      break;
    case 'delete':
      const taskId = process.argv[3];
      await deleteTask(taskId);
      break;
    case '-h' || '--help':
      console.log(`
      -h --help                 |   список команд
      add <task>                |   добавить новую задачу.
      list                      |   вывести список всех задач.
      get <id>                  |   вывести информацию о задаче с указанным ID.
      update <id> <"newTask">   |   обновить задачу с указанным ID.
      status <id> <"newStatus"> |   обновить статус задачи с указанным ID.
      delete <id>               |   удалить задачу с указанным ID.
    `);
      break;
    default:
      console.log(`
    Неверная команда.
    Для получения списка команд
    используйте ключ "-h" или "--help"
    `);
  }

  knex.destroy();
};

init();

// Пример использования
/**
 * node index.js add "Новая задача" # Добавляет новую задачу
 * node index.js list # Выводит список задач
 * node index.js delete <taskId> # Удаляет задачу по ID
 */
