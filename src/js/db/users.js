import { v4 as uuid } from 'uuid';
import { stdout } from 'process';
export default function createUsersStorage() {
    if (createUsersStorage._isCreated) {
        return createUsersStorage._storage;
    }
    createUsersStorage._isCreated = true;
    const users = [];
    let lastCheckedUser = null;
    stdout.write('\nCreated succesfully.\n');
    function addUser(user) {
        const id = uuid();
        const { username, age, hobbies } = user;
        users.push({
            id, username, age, hobbies,
        });
        return {
            id, username, age, hobbies,
        };
    }
    function getUsers() {
        return [...users];
    }
    function getUser(id) {
        return (lastCheckedUser === null || lastCheckedUser === void 0 ? void 0 : lastCheckedUser.id) === id ? Object.assign({}, lastCheckedUser) : Object.assign({}, users.find((user) => user.id === id));
    }
    function deleteUser(id) {
        users.splice(users.findIndex((user) => user.id === id), 1);
        return (lastCheckedUser === null || lastCheckedUser === void 0 ? void 0 : lastCheckedUser.id) === id ? Object.assign({}, lastCheckedUser) : Object.assign({}, users.find((user) => user.id === id));
    }
    function updateUser(id, newData) {
        var _a, _b, _c;
        const user = users.find((user) => user.id === id);
        user.username = (_a = newData.username) !== null && _a !== void 0 ? _a : user.username;
        user.age = (_b = newData.age) !== null && _b !== void 0 ? _b : user.age;
        user.hobbies = (_c = newData.hobbies) !== null && _c !== void 0 ? _c : user.hobbies;
        return Object.assign({}, user);
    }
    function isExist(id) {
        var _a;
        lastCheckedUser = (_a = users.find((user) => user.id === id)) !== null && _a !== void 0 ? _a : null;
        return !!lastCheckedUser;
    }
    return {
        addUser, getUsers, getUser, deleteUser, updateUser, isExist,
    };
}
createUsersStorage._isCreated = false;
createUsersStorage._storage = createUsersStorage();
