import postgres from 'postgres'

process.loadEnvFile();

export class Repository {
  sql: postgres.Sql;

  constructor() {
    this.sql = postgres();
  }

  async addActivity(
    param: Omit<Activity, "id_activity" | "true_start" | "true_end" | "status">,
  ) {
    await this
      .sql`INSERT INTO activity(name, description, start_date, end_date, true_start, true_end, places, status, id_user, id_event, id_room) VALUES (${param.name}, ${param.description}, ${param.start_date}, ${param.end_date}, ${param.start_date}, ${param.end_date}, ${param.places}, 'scheduled', ${param.id_user}, ${param.id_event}, ${param.id_room});`
      .then(() => {
        console.log("The activity %s has been added.", param.name);
      })
      .catch(console.error);
  }

  async getActivities() {
    return await this.sql<Activity[]>`SELECT * FROM "activity"`;
  }

  async getActivityById(id: number) {
    return await this.sql<
      Activity[]
    >`SELECT * FROM activity WHERE id_activity = ${id};`;
  }

  async editActivity(
    id: number,
    params: Partial<
      Omit<Activity, "id_activity" | "id_event" | "start_date" | "end_date">
    >,
  ) {
    await this
      .sql`UPDATE activity SET ${this.sql(params)} WHERE id_activity = ${id};`;
  }

  async deleteActivity(id: number) {
    await this.sql`DELETE FROM activity WHERE id_activity = ${id};`
      .then(() => {
        console.log("Activity: %d has been deleted", id);
      })
      .catch(console.error);
  }

  async linkUserActivity(
    id_user: number,
    id_activity: number,
  ) {
    await this
      .sql`INSERT INTO books(id_user, id_activity, waiting) VALUES (${id_user}, ${id_activity});`
      .then(() => {
        console.log(
          "User: %d and Activity: %d has been linked.",
          id_user,
          id_activity,
        );
      })
      .catch(console.error);
  }

  async getUserActivity(id_user: number, id_activity: number) {
    return await this.sql<
      Array<{ id_user: number; id_activity: number; waiting: number }>
    >`SELECT * FROM books WHERE id_user = ${id_user} AND id_activity = ${id_activity};`;
  }

  async deleteUserActivity(id_user: number, id_activity: number) {
    await this
      .sql`DELETE FROM books WHERE id_user = ${id_user} AND id_activity = ${id_activity};`
      .then(() => {
        console.log(
          "User: %d linked to the activity: %d has been deleted.",
          id_user,
          id_activity,
        );
      })
      .catch(console.error);
  }

  async addUser(params: Omit<Users, "id_user">) {
    return await this.sql<
      Users[]
    >`INSERT INTO users(first_name, last_name, role) VALUES (${params.first_name}, ${params.last_name}, ${params.role}) RETURNING *;`;
  }

  async getUsers() {
    return await this.sql<Users[]>`SELECT * FROM "users"`;
  }

  async getUserById(id: number) {
    return await this.sql<Users[]>`SELECT * FROM users WHERE id_user = ${id};`;
  }

  async editUser(id: number, params: Partial<Omit<Users, "id_user">>) {
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

  async getAuths() {
    return await this.sql<AuthUser[]>`SELECT * FROM "auth"`;
  }

  async getAuthById(id: number) {
    return await this.sql<AuthUser[]>`SELECT * FROM "auth" WHERE id_auth=${id}`;
  }

  async getAuthByEmail(email: string) {
    return await this.sql<
      AuthUser[]
    >`SELECT * FROM auth WHERE email = ${email};`;
  }

  async addAuth(params: Omit<AuthUser, "id_auth">) {
    await this.sql<
      AuthUser[]
    >`INSERT INTO "auth" (email, password, id_user) VALUES (${params.email}, ${params.password}, ${params.id_user})`;
  }

  async deleteAuth(id: number) {
    await this.getAuthById(id).then((curr_auth) =>
      console.log("Element removed :", curr_auth),
    );
    await this.sql<AuthUser[]>`DELETE FROM "auth" WHERE id_auth=${id}`;
  }

  async editAuth(id: number, params: Partial<Omit<AuthUser, "id_auth">>) {
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