import Bee from "bee-queue";
import CancellationMail from "../app/jobs/CancellationMail";
import redisConfig from "../config/redis";

const jobs = [CancellationMail];

class Queue {
	constructor() {
		this.queues = {};

		this.init();
	}

	// aqui recebe cada um dos jobs de envio de email
	init() {
		jobs.forEach(({ key, handle }) => {
			this.queues[key] = {
				bee: new Bee(key, {
					redis: redisConfig
				}),
				handle
			};
		});
	}

	// aqui adiciona os jobs na fila
	add(queue, job) {
		return this.queues[queue].bee.createJob(job).save();
	}

	// aqui faz o processamento de envio em background
	processQueue() {
		jobs.forEach(job => {
			const { bee, handle } = this.queues[job.key];

			bee.on("failed", this.handleFailure).process(handle);
		});
	}

	// aqui processo o erro
	handleFailure(job, err) {
		console.log(`Queue ${job.queue.name}: FAILED`, err);
	}
}

export default new Queue();
