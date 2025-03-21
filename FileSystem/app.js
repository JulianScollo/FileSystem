const { createInterface } = require('readline');
const FileSystem = require('./file-system');

const fileSystem = new FileSystem();
const readLine = createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt() {
  readLine.question('> ', (input) => {
    const [command, arg] = input.split(' ');
    switch (command) {
      case 'cd':
        fileSystem.cd(arg);
        break;
      case 'touch':
        fileSystem.touch(arg);
        break;
      case 'ls':
        fileSystem.ls();
        break;
      case 'mkdir':
        fileSystem.mkdir(arg);
        break;
      case 'pwd':
        fileSystem.pwd();
        break;
      case 'help':
        fileSystem.help();
        break;
      case 'exit':
        readLine.close();
        return;
      default:
        console.log('Comando deconocido');
    }
    prompt();
  });
}

console.log(
    `Bienvenido al File System
    -Para conocer los comandos escribe help`);
prompt();
