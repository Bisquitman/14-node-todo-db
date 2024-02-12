# Тема 14. CLI - приложение с хранение данных в БД

## Задание

Напишите CLI-приложение для управления задачами (To-Do List).
Приложение должно позволять пользователю создавать, просматривать, обновлять и удалять задачи.

### Требования:

Приложение должно быть запускаемым из командной строки и принимать команды от пользователя.

Приложение должно поддерживать следующие команды:

- `add <task>`: добавить новую задачу.
- `list`: вывести список всех задач.
- `get <id>`: вывести информацию о задаче с указанным идентификатором.
- `update <id> <newTask>`: обновить задачу с указанным идентификатором.
- `status <id> <newStatus>`: обновить статус задачи с указанным идентификатором.
- `delete <id>`: удалить задачу с указанным идентификатором.

Задачи должны сохраняться в базе данных (PostgreSQL), чтобы они могли быть доступными между разными запусками приложения.

---

## Примеры использования

- `node index add 'Позвонить маме'`
- `node index list`
- `node index get 1`
- `node index update 3 "Выучить Node.JS"`
- `node index status 4 "Выполнена"`
- `node index delete 1`
