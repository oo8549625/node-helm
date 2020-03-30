var exec = require('child_process').exec;
var constants = require('./constants');

module.exports = class Executer {
    constructor(helmCommand, output) {
        this.output = output ? output : constants.DefaultOutput;
        this.helmCommand = helmCommand ? helmCommand : constants.DefaultHelmCommand;
    }

    callByArguments(args, callback, isJsonOutputSupported = false) {
        if (isJsonOutputSupported) {
            args.push(constants.OutputCommand);
            args.push(this.output);
        }
        this.execute(args, callback);
    }

    callByCommand(command, callback, isJsonOutputSupported = false) {
        var args = command.split(' ');
        if (isJsonOutputSupported) {
            args.push(constants.OutputCommand);
            args.push(this.output);
        }
        this.execute(args, callback);
    }

    execute(args, callback) {
        var command = this.helmCommand
        for(var num in args){
            command += ' ' + args[num]
        }
        console.log('helm cmd: ' + command)
        exec(command, (error, stdout, stderr) =>{
            if(error) {
                console.error('error: ' + error);
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + typeof stderr);
            callback(stderr,stdout)
        });
    }
}

