import { Client, Account, TablesDB} from "appwrite";

const client = new Client()
.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);