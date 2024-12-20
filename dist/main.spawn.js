import { memCreepClean } from 'mem.creepclean';
import { workerSpawn } from 'role.worker.spawn';
import _ from 'lodash';
export class SpawnControl {
    constructor() {
        this.sourceWorkerMultiplier = 3;
    }
    weights(currentRoom, spawnName) {
        if (currentRoom.energyAvailable >= 200 &&
            !Game.spawns[spawnName].spawning) {
            // Check to see if another worker needs spawned
            const workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'Worker');
            const maxWorkers = currentRoom.find(FIND_SOURCES).length * this.sourceWorkerMultiplier;
            if (workers.length < maxWorkers) {
                workerSpawn(spawnName);
                this.display(spawnName, 'Worker');
            }
        }
    }
    display(spawnName, creepRole) {
        Game.spawns[spawnName].room.visual.text('🛠️' + creepRole, Game.spawns[spawnName].pos.x + 1, Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
        memCreepClean();
    }
}