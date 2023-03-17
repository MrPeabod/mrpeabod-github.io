var execBtn = document.getElementById("execute");
var outputElm = document.getElementById("output");
var errorElm = document.getElementById("error");
var commandsElm = document.getElementById("commands");
var dbFileElm = document.getElementById("dbfile");
var allTablesElm = document.getElementById("demo");
var savedbElm = document.getElementById("savedb");

// Global variables for changes of Tables and Columns in the db file
var allTables = [["Auf Canvas ziehen","Erst Datenbank hochladen"]];
var isFileChange = false;
var fieldMapping = {};
var iterator = 0;
var currFileName = "";
// Start the worker in which sql.js will run
var worker = new Worker("scripts/worker.sql-wasm.js");
worker.onerror = error;

// Open a database
worker.postMessage({ action: "open" });

// Connect to the HTML element we "print" to
function print(text) {
	outputElm.innerHTML = text.replace(/\n/g, "<br>");
}

// Error Management
function error(e) {
	console.log(e);
	errorElm.style.height = "2em";
	errorElm.textContent = e.message;
}
function noerror() {
	errorElm.style.height = "0";
}

// Make "allTables" accessable for initialization of blocks
function getTables() {
	return allTables;
}

// fill "allTables" with a list of all Tables in the db file (only onChangeFile)
function getAllTables(result) {
	const array = new Array(result[0].values.length);		
	for (let i = 0; i < array.length; i++) {
		array[i] = [result[0].values[i][0], result[0].values[i][0]];
	}
	array[array.length] = ["*", "*"];
	allTables = array;
	updateBlocks();
	updateFieldMapping();
	isFileChange = false;
}

// Update the mapping of fields per table in the dictionary "fieldMapping" (only onChangeFile)
function updateFieldMapping() {
	tic();
		worker.onmessage = function (event) {
			var results = event.data.results;
			toc("Executing SQL");
			if (!results) {
				return;
			}
			tic();
			const array = new Array(results[0].values.length);
			for (let i = 0; i < array.length; i++) {
			  array[i] = [results[0].values[i][1], results[0].values[i][1]];
			}
			fieldMapping[allTables[iterator][0]] = array;
			iterator++;
		}
		allTables.forEach(tableName => {
			if (tableName[0] != "*"){
				worker.postMessage({ action: "exec", sql: `PRAGMA table_info(${tableName[0]});` });
			}
		});
		iterator = 0;
		fieldMapping = {};
}

// Update Blocks on Workspace that are affected by a change of the db file
function updateBlocks() {
	var blocks = workspace.getAllBlocks();
	blocks.forEach(block => {
		if (block.type == "table") {
			block.removeInput("TABLE");
			block.appendValueInput("TABLE")
					.setCheck(["column", "alias"])
					.appendField(new Blockly.FieldDropdown(getTables()), "TABLE");
		}
		if (block.type == "join") {
			swapStatement(block);
		}
	});
}

// Run a command in the database
function execute(commands) {
	tic();
	worker.onmessage = function (event) {
		var results = event.data.results;
		toc("Executing SQL");
		if (!results) {
			error({message: event.data.error});
			return;
		}
		tic();
		outputElm.innerHTML = "";
		if (isFileChange) {getAllTables(results);}
		for (var i = 0; i < results.length; i++) {
			outputElm.appendChild(tableCreate(results[i].columns, results[i].values));
		}
		if (results.length == 0) {
			outputElm.appendChild(tableCreate(["Nothing found with your query"], [["..."]]));
		}
		toc("Displaying results");
	}
	worker.postMessage({ action: "exec", sql: commands });
	outputElm.textContent = "Fetching results...";
}

// Create an HTML table
var tableCreate = function () {
	function valconcat(vals, tagName) {
		if (vals.length === 0) return "";
		var open = "<" + tagName + ">", close = "</" + tagName + ">";
		return open + vals.join(close + open) + close;
	}
	return function (columns, values) {
		var tbl = document.createElement("table");
		var html = "<thead>" + valconcat(columns, "th") + "</thead>";
		var rows = values.map(function (v) { return valconcat(v, "td"); });
		html += "<tbody>" + valconcat(rows, "tr") + "</tbody>";
		tbl.innerHTML = html;
		return tbl;
	}
}();

// Execute the commands when the button is clicked
function execEditorContents() {
	noerror()
	execute(editor.getValue() + ";");
}
execBtn.addEventListener("click", execEditorContents, true);

// Performance measurement functions
var tictime;
if (!window.performance || !performance.now) { window.performance = { now: Date.now } }
function tic() { tictime = performance.now() }
function toc(msg) {
	var dt = performance.now() - tictime;
	console.log((msg || "toc") + ": " + dt + "ms");
}

// Add syntax highlihjting to the textarea
var editor = CodeMirror.fromTextArea(commandsElm, {
	mode: "text/x-mysql",
	viewportMargin: Infinity,
	indentWithTabs: true,
	smartIndent: true,
	lineNumbers: true,
	matchBrackets: true,
	autofocus: false,
	extraKeys: {
		"Ctrl-Enter": execEditorContents,
		"Ctrl-S": savedb,
	}
});

// Load a db from a file
dbFileElm.onchange = function () {
	var f = dbFileElm.files[0];
	currFileName = f.name;
	var r = new FileReader();
	r.onload = function () {
		worker.onmessage = function () {
			toc("Loading database from file");
			editor.setValue("SELECT `name`, `sql`\n  FROM `sqlite_master`\n  WHERE type=\"table\";");
			execEditorContents();
			isFileChange = true;
		};
		tic();
		try {
			worker.postMessage({ action: "open", buffer: r.result }, [r.result]);
		}
		catch (exception) {
			worker.postMessage({ action: "open", buffer: r.result });
		}
	}
	r.readAsArrayBuffer(f);
}

// Save the db to a file
function savedb() {
	worker.onmessage = function (event) {
		toc("Exporting the database");
		var arraybuff = event.data.buffer;
		var blob = new Blob([arraybuff]);
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.href = window.URL.createObjectURL(blob);
		a.download = currFileName;
		a.onclick = function () {
			setTimeout(function () {
				window.URL.revokeObjectURL(a.href);
			}, 1500);
		};
		a.click();
	};
	tic();
	worker.postMessage({ action: "export" });
}
savedbElm.addEventListener("click", savedb, true);
