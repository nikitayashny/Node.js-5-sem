const util = require('util');
const events = require('events');

let dbData = [
    {
        id: 1,
        name: 'Nikita Yashny',
        bday: '2004-01-31'
    },
    {
        id: 2,
        name: 'Maxim Pozdnyakov',
        bday: '2004-08-26'
    },
    {
        id: 3,
        name: 'Nikita Tarakanov',
        bday: '2004-02-07'
    }
];

function DB() {
	this.getIndex = () => { return dbData.length; };    
    this.getLastId = () => {return dbData[dbData.length - 1].id}    
    this.select = () => { return dbData; }; 
    this.insert = row => { dbData.push(row); };
    this.update = row => {
        let indexOfObj = dbData.findIndex(item => item.id == row.id);
        return dbData.splice(indexOfObj, 1, row);
      }

    this.delete = id => {
		console.log(id);
	    let delIndex = dbData.findIndex(element => element.id === id);
		console.log(delIndex);
	    if(delIndex !== -1) {
	        return dbData.splice(delIndex, 1);
	    }
	    else {
	    	return JSON.parse('{"error": "no index"}');
		}
    };
}

util.inherits(DB, events.EventEmitter);
exports.DB = DB;