const hat = require('hat')
const fs = require('fs')
var jf = require('../')
// benchmark
var mem_use_init = parseInt( process.memoryUsage().heapUsed )
var time_init 	 = parseInt( new Date().getTime() )
var file 		 = "./benchmark.json"

const benchMark = function() {	
	test().then(()=>{jsminTest().then(()=>{stripJsonCommentsTest()})})
}

const test = function() {
	return new Promise( ( res, rej ) => {
		console.log( "Unchanged" )
		let obj = generateLargeObject()
		fs.writeFileSync(file, JSON.stringify(obj))
		jf.readFile(file, function (err, obj2) {
		  let mem_use_now =  parseInt( process.memoryUsage().heapUsed  )
		  let time_now = parseInt(new Date().getTime())
		  console.log( "Memory Use: " + ( mem_use_now - mem_use_init ) )
		  console.log( "Time Use: " + ( time_now - time_init ) )
		  mem_use_init = mem_use_now
		  time_init  = time_now
		 res()
		})
	})
}

const jsminTest = function() {
	return new Promise( ( res, rej ) => {
		console.log( "JSMin" )
		let obj = generateLargeObject()
		fs.writeFileSync(file, JSON.stringify(obj))
		jf.readFileJSMin(file, function (err, obj2) {
		  let mem_use_now =  parseInt( process.memoryUsage().heapUsed  )
		  let time_now = parseInt(new Date().getTime())
		  console.log( "Memory Use: " + ( mem_use_now - mem_use_init ) )
		  console.log( "Time Use: " + ( time_now - time_init ) )
		  mem_use_init = mem_use_now
		  time_init  = time_now
		  res()
		})	
	})
}

const stripJsonCommentsTest = function() {
	return new Promise( ( res, rej ) => {
		console.log( "Strip JSON Comments" )
		let obj = generateLargeObject()
		fs.writeFileSync(file, JSON.stringify(obj))
		jf.readFileStripComments(file, function (err, obj2) {
	  	  let mem_use_now =  parseInt( process.memoryUsage().heapUsed  )
		  let time_now = parseInt(new Date().getTime())
		  console.log( "Memory Use: " + ( mem_use_now - mem_use_init ) )
		  console.log( "Time Use: " + ( time_now - time_init ) )
		  mem_use_init = mem_use_now
		  time_init  = time_now
		 res()
		})
	})
}

const generateLargeObject = function() {
	let obj = {}
	for( let i = 0; i < 9999; i++ ) {
		obj[hat()] = hat()
	}
	return obj
}
benchMark()
