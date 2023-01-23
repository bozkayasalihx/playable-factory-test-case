const cp = require("child_process");
class Spawn {
    /**
     *
     * @param {string} command
     * @param {Array<string>} args
     * @param {Record<string, any>} options
     * @returns
     */
    spawn(command, args, options) {
        const parsed = this.parse(command, args, options);
        const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
        this.hookChildProcess(spawned, parsed);
        return spawned;
    }
    /**
     *
     * @param {string} command
     * @param {Array<string>} args
     * @param {Record<string, any>} options
     * @returns
     */
    parse(command, args, options) {
        if (args && !Array.isArray(args)) {
            options = args;
            args = null;
        }

        args = args ? args.slice(0) : [];
        options = Object.assign({}, options);

        const parsed = {
            command,
            args,
            options,
            file: undefined,
            original: {
                command,
                args,
            },
        };

        return parsed;
    }

    isWin() {
        return process.platform === "win32";
    }

    hookChildProcess() {
        if (!this.isWin) {
            return;
        }

        function verifyENOENT(status, parsed) {
            if (isWin && status === 1 && !parsed.file) {
                return notFoundError(parsed.original, "spawn");
            }

            return null;
        }
        function notFoundError(original, syscall) {
            return Object.assign(
                new Error(`${syscall} ${original.command} ENOENT`),
                {
                    code: "ENOENT",
                    errno: "ENOENT",
                    syscall: `${syscall} ${original.command}`,
                    path: original.command,
                    spawnargs: original.args,
                }
            );
        }

        const originalEmit = cp.emit;
        cp.emit = function (name, arg1) {
            if (name === "exit") {
                const err = verifyENOENT(arg1, parsed, "spawn");
                if (err) {
                    return originalEmit.call(cp, "error", err);
                }
            }

            return originalEmit.apply(cp, arguments);
        };
    }
}

const spawn = new Spawn();
module.exports = spawn
