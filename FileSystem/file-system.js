class FileSystem {

    constructor() {
      this.rootDirectory = { name: '/', type: 'directory', children: {}};
      this.currentDirectory = this.rootDirectory;
      this.directoryHistory = [this.rootDirectory];

    }
  
    cd(directoryName) {
      if (directoryName === "..") {
        if (this.directoryHistory.length > 1) {
          this.directoryHistory.pop();
          this.currentDirectory = this.directoryHistory[this.directoryHistory.length - 1];
        }
      } else {
        const lowerDirName = directoryName.toLowerCase();

        const targetDirectory = Object.entries(this.currentDirectory.children)
          .find(([name, directory]) => 
            name.toLowerCase() === lowerDirName && directory.type === 'directory'
          );
  
        if (targetDirectory) {
          this.currentDirectory = targetDirectory[1]; 
          this.directoryHistory.push(this.currentDirectory);
        } else {
          console.log(`No exite el directorio: ${directoryName}`);
        }
      }
    }
  
    touch(fileName) {
      if (fileName == "") {
           console.log('Error: El campo no puede esta vacio');
           return;
      }

      if (!this.currentDirectory.children[fileName]) {
        this.currentDirectory.children[fileName] = { name: fileName, type: 'file' };
      } else {
        console.log(`El archivo: ${fileName} ya existe`);
      }
    }
  
    ls() {
      console.log(Object.keys(this.currentDirectory.children).join(' ') || 'Vacio');
    }
  
    mkdir(directoryName) {
      if (directoryName == "") {
        console.log('Error: El campo no puede esta vacio');
        return;
      }
      
      if (!this.currentDirectory.children[directoryName]) {
        this.currentDirectory.children[directoryName] = { name: directoryName, type: 'directory', children: {} };
      } else {
        console.log(`La carpeta: ${directoryName} ya existe`);
      }
    }
  
    pwd() {
      console.log('/' + this.directoryHistory.map(directory => directory.name).filter(name => name !== '/').join('/'));
    }

    help() {
        console.log(`
        Comandos:
            cd                  Cambiar a un directorio especifico
            touch               Crear un nuevo archivo
            ls                  Listar archivos y directorios en el directorio actual
            mkdir               Crear un nuevo directorio
            pwd                 Mostrar la ruta actual
            exit                Salir del simulador de sistema de archivos
            help                Mostrar este mensaje de ayuda
            `);
      }
  }

module.exports = FileSystem;