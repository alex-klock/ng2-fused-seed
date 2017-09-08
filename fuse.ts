/**
 * FuseBox fuse file.  Actual task definitions and fuse-box build can be found in the /tools/tasks folder.
 */
import { 
    executeTask, 
    initializeTasks 
} from './tools/task-utils';

// initialize the task from the command line arguments...
initializeTasks();

// execute task(s), multiple commands are allowed.
executeTask();