git-hub
=======

Single-minded CLI for crazy folk.

### How to use it

```git hub [<command> [<args>]]```

### How to set things up

1. Install it: ```sudo npm install -g git://github.com/dglazkov/git-hub.git```
2. In your project, add ```hub``` directory
3. For each command you would like to run, add a module named after the command. For example, to enable the ```sync``` command, write a module ```./hub/sync.js```.
4. Add ```default.js``` for the default command (that's when you just run ```git hub```)


 
