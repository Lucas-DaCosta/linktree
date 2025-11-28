import postgres from 'postgres'
import * as user from "./models/users.ts";
import * as auth from "./models/auth.ts";
import * as slots from "./models/timeslots.ts";
import * as linktree from "./models/linktree.ts";

process.loadEnvFile();

export class Repository {
  sql: postgres.Sql;

  constructor() {
    this.sql = postgres();
  }

  async addSlot(
    param: slots.InputSlot,
  ) {
    await this
      .sql`INSERT INTO timeslots(start_date, end_date, username, user_email, id_user) VALUES (${param.start_date}, ${param.end_date}, ${param.username}, ${param.user_email}, ${param.id_user});`
      .then(() => {
        console.log("The slot at %s has been booked.", param.start_date);
      })
      .catch(console.error);
  }

  async getSlots() {
    return await this.sql<slots.Slot[]>`SELECT * FROM "timeslots"`;
  }

  async getUserSlots(id: number) {
    return await this.sql<slots.Slot[]>`SELECT * FROM "timeslots" WHERE id_user = ${id}`;
  }

  async getSlotById(id: number) {
    return await this.sql<
      slots.Slot[]
    >`SELECT * FROM timeslots WHERE id_slot = ${id};`;
  }

  async editSlot(
    id_slot: number,
    id_user: number,
    params: slots.PartialSlot
  ) {
    await this
      .sql`UPDATE timeslots SET ${this.sql(params)} WHERE id_slot = ${id_slot} AND is_user = ${id_user};`;
  }

  async deleteSlot(id: number) {
    await this.sql`DELETE FROM timeslots WHERE id_slot = ${id};`
      .then(() => {
        console.log("Timeslot: %d has been deleted", id);
      })
      .catch(console.error);
  }

  async addUser(params: user.InputUser) {
    return await this.sql<
      user.User[]
    >`INSERT INTO users(username, description, speciality, avatar) VALUES (${params.username}, ${params.description}, ${params.speciality}, ${params.avatar}) RETURNING *;`;
  }

  async getUsers() {
    return await this.sql<user.User[]>`SELECT * FROM "users"`;
  }

  async getUserById(id: number) {
    return await this.sql<user.User[]>`SELECT * FROM "users" WHERE id_user = ${id};`;
  }

  async editUser(id: number, params: user.PartialUser) {
    await this.sql`UPDATE users SET ${this.sql(params)} WHERE id_user = ${id};`;
  }

  async deleteUserById(id: number) {
    await this.getUserById(id).then((curr_auth) =>
      console.log("Element removed :", curr_auth),
    );
    await this.sql`DELETE FROM users WHERE id_user = ${id};`
      .then(() => {
        console.log("The id %d has been removed.", id);
      })
      .catch(console.error);
  }

  async addLinktree(params: linktree.InputLink) {
    return await this.sql<
      linktree.Linktree[]
    >`INSERT INTO linktree(name, logo, url, id_user) VALUES (${params.name}, ${params.logo}, ${params.url}, ${params.id_user}) RETURNING *;`;
  }

  async getLinktree() {
    return await this.sql<linktree.Linktree[]>`SELECT * FROM "linktree"`;
  }

  async getUserLinktree(id: number) {
    return await this.sql<linktree.Linktree[]>`SELECT * FROM "linktree" WHERE id_user = ${id}`;
  }

  async getLinktreeById(id: number) {
    return await this.sql<linktree.Linktree[]>`SELECT * FROM linktree WHERE id_link = ${id};`;
  }

  async editLinktree(id_link: number, id_user: number, params: linktree.PartialLink) {
    await this.sql`UPDATE linktree SET ${this.sql(params)} WHERE id_link = ${id_link} AND id_user = ${id_user};`;
  }

  async deleteLinktreeById(id: number) {
    await this.getLinktreeById(id).then((curr_auth) =>
      console.log("Element removed :", curr_auth),
    );
    await this.sql`DELETE FROM linktree WHERE id_user = ${id};`
      .then(() => {
        console.log("The id %d has been removed.", id);
      })
      .catch(console.error);
  }

  async getAuths() {
    return await this.sql<auth.AuthUser[]>`SELECT * FROM "auth"`;
  }

  async getAuthById(id: number) {
    return await this.sql<auth.AuthUser[]>`SELECT * FROM "auth" WHERE id_auth=${id}`;
  }

  async getAuthByEmail(email: string) {
    return await this.sql<
      auth.AuthUser[]
    >`SELECT * FROM auth WHERE email = ${email};`;
  }

  async addAuth(params: auth.InputAuth) {
    await this.sql<
      auth.AuthUser[]
    >`INSERT INTO "auth" (email, password, id_user) VALUES (${params.email}, ${params.password}, ${params.id_user})`;
  }

  async deleteAuth(id: number) {
    await this.getAuthById(id).then((curr_auth) =>
      console.log("Element removed :", curr_auth),
    );
    await this.sql<auth.AuthUser[]>`DELETE FROM "auth" WHERE id_auth=${id}`;
  }

  async editAuth(id: number, params: auth.PartialAuth) {
    await this.sql`UPDATE auth SET ${this.sql(params)} WHERE id_auth = ${id};`;
  }

  async login(email: string, password: string) {
    const auth = await this.getAuthByEmail(email);
    if (auth.length !== 0) {
      if (auth[0].password === password) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  async end() {
    return await this.sql.end();
  }
}