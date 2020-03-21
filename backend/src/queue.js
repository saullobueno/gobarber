import "dotenv/config";

import Queue from "./lib/Queue";

// fazendo com q as filas rodem separado do Node ajudando na performance do app
Queue.processQueue();
