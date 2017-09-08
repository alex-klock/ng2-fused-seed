
import { Sparky } from 'fuse-box';
import { NgBuildContext } from './ng-build-context';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as util from 'util';
import * as postcss from 'postcss';
import * as cssImport from 'postcss-import';
import * as cssnext from 'postcss-cssnext';
import * as nested from 'postcss-nested';

const config = NgBuildContext.config;
const paths = NgBuildContext.paths;

export function buildCss(file: SparkyFile) {
    file.read();
    return postcss([cssImport({
        from: paths.workspace('app/shared')
     }), nested, cssnext]).process(file.contents, { from: file.filepath, to: file.filepath }).then(result => {
        file.setContent(result.css);
    });
}

export function cleanPath(pathToClean: string = paths.build('./', '')) {
    return Sparky
        .src([])
        .clean(pathToClean);
}

export function enableDisableProdMode(file: SparkyFile) {
    file.read();
    let contents: string = <string>file.contents.toString();
    file.setContent(contents.replace('//@enableProdMode', config.production ? 'enableProdMode();' : ''));
}

export function executeTask(taskIndex: number = 0) {
    const tasks = NgBuildContext.tasks;

    if (taskIndex >= tasks.length) {
        return;
    }

    let task = tasks[taskIndex];
    console.log(`Executing ${task.name} (${taskIndex + 1} of ${tasks.length})`);
    Sparky.start(task.name).then(() => {
        // execute next task after completion if it wasn't async
        if (!task.isAsync) {
            executeTask(taskIndex + 1);
        }
    });

    // execute next task if this is an async one.
    if (task.isAsync) {
        executeTask(taskIndex + 1);
    }
}

export function initializeTasks() {
    // We're executing manually, so disable automatic call to Sparky.start().
    Sparky.launch = true;
    NgBuildContext.tasks = [];

    const taskArgs = process.argv.slice(2);
    const globalCliArgs = {};

    for (let arg of taskArgs) {
        if (!arg.startsWith('-')) {
            let taskName = arg;
            let split = taskName.split(':');
            let taskFile = split[0];
            let isTaskAsync = false;

            if (taskName.indexOf('&') === 0) {
                taskName = taskName.substr(1);
                isTaskAsync = true;
            }

            if (taskName === 'build:aot') {
                config.aot = true;
            }

            NgBuildContext.tasks.push({
                name: taskName,
                file: taskFile,
                isAsync: isTaskAsync
            });
        }
    }

    let taskFolder = path.join(process.cwd(), 'tools/tasks');
    let files = fs.readdirSync(taskFolder);
    for (let file of files) {
        if (file !== 'index.ts') {
            require(path.join(taskFolder, file));
        }
    }
}

export function renameFile(filePath: string, newFilePath: string): Promise<void> {
    return fs.pathExists(filePath).then(exists => {
        if (exists) {
            return fs.rename(filePath, newFilePath); 
        }
    });  
}

export function removePaths(...filePaths: string[]): Promise<any> {
    let removes = [];
    for (let file of filePaths) {
        removes.push(fs.remove(file));
    }
    return Promise.all(removes);
}

export {
    Sparky,
    NgBuildContext
};