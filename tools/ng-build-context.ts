import { NgBuildConfig } from '../config/ng-build.config';
import * as path from 'path';

function getBuildPath(configPath: string, prefix: string, joinPath: string) {
    if (prefix && !joinPath) {
        joinPath = prefix;
        prefix = null;
    }
    return path.posix.join(prefix || '', configPath, joinPath || '').replace(/\\/g, '');
}

/**
 * Information about the current running build.
 * 
 * @export
 * @class NgBuildContext
 */
export class NgBuildContext {

    public static config = NgBuildConfig;

    /**
     * Getters for build paths that easily allow the joining of paths. All paths are returned with foward slashes, despite 
     * what's in the configuration.
     * 
     * @static
     * @type {{
     *        build(): string;
     *        build(joinPath:string): string;
     *        build(prefix: string, joinPath: string): string;
     *    
     *        dist(): string;
     *        dist(joinPath: string): string;
     *        dist(prefix: string, joinPath: string);
     *        
     *        workspace(): string;
     *        workspace(joinPath: string): string;
     *        workspace(prefix: string, joinPath: string);
     *     }}
     * @memberof NgBuildContext
     */
    public static paths: {
       build(): string;
       build(joinPath:string): string;
       build(prefix: string, joinPath: string): string;
   
       dist(): string;
       dist(joinPath: string): string;
       dist(prefix: string, joinPath: string);
       
       workspace(): string;
       workspace(joinPath: string): string;
       workspace(prefix: string, joinPath: string);
    } = {
        build: function (joinPathOrPrefix?: string, joinPath?: string) {
            return getBuildPath(NgBuildConfig.paths.build, joinPathOrPrefix, joinPath);
        },
        dist: function (joinPathOrPrefix?: string, joinPath?: string) {
            return getBuildPath(NgBuildConfig.paths.dist, joinPathOrPrefix, joinPath);
        },
        workspace: function (joinPathOrPrefix?: string, joinPath?: string) {
            return getBuildPath(NgBuildConfig.paths.workspace, joinPathOrPrefix, joinPath);
        }
    };

    /**
     * Tasks that were named from the command line for this build.
     * 
     * @static
     * @type {{
     *         file: string;
     *         isAsync: boolean;
     *         name: string;
     *     }[]}
     * @memberof NgBuildContext
     */
    public static tasks: {
        file: string;
        isAsync: boolean;
        name: string;
    }[] = [];
}

